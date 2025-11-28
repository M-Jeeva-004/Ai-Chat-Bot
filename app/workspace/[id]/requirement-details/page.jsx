"use client"
import React from 'react'
import { useRequirement } from '../../../context/WorkspaceContext';
import FileUpload from "@/app/compenents/FileUpload";


const RequirementDetails = () => {

  const {
    files,
    setFiles,
    notification,
    uploadedFiles,
  } = useRequirement();

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

export default RequirementDetails