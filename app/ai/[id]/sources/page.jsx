'use client'
import FileUpload from "@/app/compenents/FileUpload";
import { useSources } from "@/app/context/SourcesContext";

const Sources = () => {

  const {
    files,
    setFiles,
    notification,
    uploadedFiles,
  } = useSources(); 


    // 🔹 Fetch uploaded files *ONLY* when sessionId changes and is valid
  // useEffect(() => {
  //   if (!sessionId) return;

  //   const fetchUploadedFiles = async () => {
  //     try {
  //       const uploadedRes = await fetch(
  //         `${LAMBDA_URL}?action=get_uploaded_files&session_id=${sessionId}`
  //       );
  //       const uploadedData = await uploadedRes.json();

  //       // 🔹 remove duplicates before updating
  //       setUploadedFiles((prev) => {
  //         const combined = [...prev, ...uploadedData.uploaded_files];
  //         return Array.from(new Set(combined)); // remove duplicates
  //       });
  //     } catch (error) {
  //       console.error("Error fetching uploaded files:", error);
  //     }
  //   };

  //   fetchUploadedFiles();
  // }, [sessionId]);

  // const uploadToS3 = async () => {
  //   if (files.length === 0) {
  //     alert("Please upload a file first.");
  //     return;
  //   }
 
  //   // setUploading(true);
 
  //   for (let file of files) {
  //     try {
  //       // 1️⃣ Call Lambda to generate pre-signed URL
  //       const res = await fetch(`${LAMBDA_URL}?filename=${file.name}`);
  //       const data = await res.json();
 
  //       const uploadUrl = data.upload_url;
  //       console.log("Upload URL:", uploadUrl);
 
  //       // 2️⃣ Upload file to S3
  //       const uploadRes = await fetch(uploadUrl, {
  //         method: "PUT",
  //         body: file,
  //       });
 
  //       if (!uploadRes.ok) {
  //         alert(`Failed to upload ${file.name}`);
  //         setNotification({
  //           message: 'FIled to upload',
  //           visibility: true,
  //           type: 'error',
  //         });
  //         setTimeout(() => {
  //           setNotification(prev => ({ ...prev, visibility: false }))
  //         }, 3000);
  //         continue;
  //       }
 
  //       console.log(`${file.name} uploaded successfully`);
  //       setNotification({
  //       message: 'File uploaded successfully',
  //       visibility: true,
  //       type: 'success',
  //     });
  //     setTimeout(() => {
  //       setNotification(prev => ({ ...prev, visibility: false }))
  //     }, 3000)
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
 
  //   // setUploading(false);
  //   // alert("All files uploaded to S3 successfully!");
  // };

  // const uploadToS3 = async () => {
  //   if (files.length === 0) {
  //     alert("Please upload a file first.");
  //     return;
  //   }
 
  //   try {
  //     // 1️⃣ Generate pre-signed URLs from Lambda
  //     const filenamesParam = files.map((f) => f.name).join(",");
  //     const res = await fetch(`${LAMBDA_URL}?action=generate_urls&filenames=${filenamesParam}`);
  //     const data = await res.json();
 
  //     const presignedUrls = data.urls;
  //     const currentSessionId = data.session_id;
  //     setSessionId(currentSessionId);
 
  //     // 2️⃣ Upload each file to S3 via pre-signed URL
  //     for (let file of files) {
  //       const uploadUrl = presignedUrls[file.name];
  //       const uploadRes = await fetch(uploadUrl, {
  //         method: "PUT",
  //         body: file,
  //       });
 
  //       if (!uploadRes.ok) {
  //         alert(`Failed to upload ${file.name}`);
  //         setNotification({
  //           message: 'Failed to upload',
  //           visibility: true,
  //           type: 'error',
  //         });
  //         setTimeout(() => {
  //           setNotification(prev => ({ ...prev, visibility: false }))
  //         }, 3000);
  //       }
  //     }

  //     setNotification({
  //       message: 'File uploaded successfully',
  //       visibility: true,
  //       type: 'success',
  //     });
  //     setTimeout(() => {
  //       setNotification(prev => ({ ...prev, visibility: false }))
  //     }, 3000)
 
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error uploading files");
  //     setNotification({
  //       message: err,
  //       visibility: true,
  //       type: 'error',
  //     });
  //     setTimeout(() => {
  //       setNotification(prev => ({ ...prev, visibility: false }))
  //     }, 3000);
  //   }
  //   setFiles([]);
  // };

  return (
    <div className='w-[80%] gap-[20px] flex ml-[30px] pb-4 max-lg:flex-col'>
      <FileUpload files={files} setFiles={setFiles} uploadedFiles={uploadedFiles} />

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