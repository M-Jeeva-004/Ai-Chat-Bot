'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Select from "react-select";
import { filesData } from "../data/source";
import { customStyles2 } from "../data/selectStyle";
import { useSources } from "@/app/context/SourcesContext";

const MAX_SIZE_MB = 20;
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'text/plain', // .txt
];

const FileUpload = ({ files, setFiles, uploadedFiles }) => {
  const [searchFiles, setSearchFiles] = useState("");
  const [filesByUpdation, setFilesByUpdation] = useState("modified_new");
  // const {
  //   files,
  //   setFiles,
  //   uploadedFiles,
  // } = useSources(); 

  const validateFiles = (fileList) => {
    const validFiles = [];

    Array.from(fileList).forEach((file) => {
      const isValidType = ALLOWED_TYPES.includes(file.type);
      const isValidSize = file.size <= MAX_SIZE_MB * 1024 * 1024;

      if (isValidType && isValidSize) {
        validFiles.push(file);
      }
    });

    return validFiles;
  };

  const handleFiles = (selectedFiles) => {
    const validFiles = validateFiles(selectedFiles);
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // const filterFiles = uploadedFiles.filter((file) => file.toLowerCase().includes(searchFiles.toLowerCase()));
  // console.log(uploadedFiles, "Uploaded files")

  return (
    <div className='w-full overflow-auto pt-5 pl-5 pb-1 scrollbar-hide rounded'>
      <div className="flex flex-col gap-3 w-[95%] h-fit shadow-11 rounded">
        <div className='p-4'>
          <h1 className="text-black font-bold rounded-t">Files</h1>
          <p className='text-gray-500 text-sm'>The Files tab allows you to upload and manage various document types to train your AI agent.</p>
        </div>
        

        <div className="h-auto flex justify-start items-center flex-col">
          <label htmlFor="fileInput" className="w-full flex-items-2">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 w-[90%] h-[200px] flex-items flex-col shadow-1"
            >
              <Image
                src="/upload.png"
                alt="Upload icon"
                width={60}
                height={40}
              />
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => {
                  if (e.target.files) {
                    handleFiles(e.target.files);
                    e.target.value = null;
                  }
                }}
                className="hidden"
                id="fileInput"
              />
              <label htmlFor="fileInput" className="cursor-pointer text-gray-600 font-bold">
                Drag & Drop / Browse Files<br />
                <span className="text-sm text-gray-400 font-light">
                  (Only .pdf, .doc, .docx, .txt - Max 20MB each)
                </span>
              </label>
            </div>
          </label>

          {/* Uploaded Files List */}
          <div className={`${files.length > 0 ? "my-[40px]" : "mb-8"} space-y-2 w-[90%]`}>
            
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white border p-2 rounded shadow-sm"
                >
                  <p className="text-sm text-black truncate w-4/5">{file.name}</p>
                  <button
                    className="text-red-500 hover:text-red-700 font-bold text-lg"
                    onClick={() => handleRemove(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            
          </div>
        </div>

        
      </div>

      <div className='flex flex-col gap-3 w-[95%] h-fit shadow-11 rounded bg-white mt-4 p-5'>

        <div className='justify-items'>
          <h2 className='text-black'>File Sources</h2>
          <div className="group flex items-center px-4 py-0 rounded-md border-2 border-gray-400 overflow-hidden max-w-md mr-5 h-[35px] hover:border-green-500 focus-within:border-green-500">
            <input type="text" 
              placeholder="Search"
              value={searchFiles}
              onChange={(e)=> setSearchFiles(e.target.value)}
              className="w-full outline-none bg-transparent text-gray-600 text-sm h-[35px]" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-400 group-hover:fill-green-500">
              <path
                d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
              </path>
            </svg>
          </div>
        </div>
        
        {uploadedFiles.length === 0 ? 
          <div className='text-black'>
              No  Data
          </div>
         : <div>
          <div className='justify-items'>
            <div className='flex'>
              <input type="checkbox" />
              <p>Select All</p>
            </div>
            
            <div>
              <Select 
                  instanceId="chat-manager"
                  options={filesData}
                  value={filesData.find(option => option.value === filesByUpdation)}
                  onChange={(e)=> setFilesByUpdation(e.value)}
                  styles={customStyles2}
                  className="text-sm w-full"
                  menuPlacement='top'
                  components={{
                  IndicatorSeparator: () => null
                  }}
              />
            </div>
          </div>
          {uploadedFiles.map((files, index) => (
            <div key={index} className=''>

              <div>{files}</div>
            </div> 
          ))}
         </div>
        }
        
      </div>
    </div>
  );
};

export default FileUpload;
