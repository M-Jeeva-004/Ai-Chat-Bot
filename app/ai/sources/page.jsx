'use client'
import FileUpload from "@/app/compenents/FileUpload";
import SourceRight from "@/app/compenents/SourceRight";
import { useState } from "react";

const Sources = () => {

  const [files, setFiles] = useState([]);
  const [notification, setNotification] = useState({ message: '', visibility: false, type: '' });

  const LAMBDA_URL = "https://vubyvd7ejneqaldnwm7ed53efu0omwvm.lambda-url.ap-south-1.on.aws/";

  const uploadToS3 = async () => {
    if (files.length === 0) {
      alert("Please upload a file first.");
      return;
    }
 
    // setUploading(true);
 
    for (let file of files) {
      try {
        // 1️⃣ Call Lambda to generate pre-signed URL
        const res = await fetch(`${LAMBDA_URL}?filename=${file.name}`);
        const data = await res.json();
 
        const uploadUrl = data.upload_url;
        console.log("Upload URL:", uploadUrl);
 
        // 2️⃣ Upload file to S3
        const uploadRes = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
        });
 
        if (!uploadRes.ok) {
          alert(`Failed to upload ${file.name}`);
          setNotification({
            message: 'FIled to upload',
            visibility: true,
            type: 'error',
          });
          setTimeout(() => {
            setNotification(prev => ({ ...prev, visibility: false }))
          }, 3000);
          continue;
        }
 
        console.log(`${file.name} uploaded successfully`);
        setNotification({
        message: 'File uploaded successfully',
        visibility: true,
        type: 'success',
      });
      setTimeout(() => {
        setNotification(prev => ({ ...prev, visibility: false }))
      }, 3000)
      } catch (err) {
        console.error(err);
      }
    }
 
    // setUploading(false);
    // alert("All files uploaded to S3 successfully!");
  };

  return (
    <div className='w-[80%] gap-[20px] flex ml-[30px] pb-4 max-lg:flex-col'>
      <FileUpload files={files} setFiles={setFiles} />
      <SourceRight content='Documents' files={files} uploadToS3={uploadToS3} />

      {notification.visibility && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-md text-sm transition-opacity duration-300
          ${notification.type === 'success' ? 'bg-green-100 text-green-500 border border-green-400' : 'bg-red-100 border border-red-500 text-red-500'}`}
        >
          {notification.message}
        </div>
      )}
    </div>
  )
}

export default Sources