"use client"
import React from 'react';
import { usePathname } from "next/navigation";
import { FileText, NotepadText, MessagesSquare, Globe } from "lucide-react";
import { useSources } from "@/app/context/SourcesContext";
import { useRequirement } from "@/app/context/WorkspaceContext";

const SourceRight = () => {
    const pathName = usePathname();

    const sourceCtx = useSources();
    const requirementCtx = useRequirement();

    const isAIPath = pathName.startsWith("/ai");

    // Select correct context based on path
    const { files, links, snippets, qaSnippets, notification } =
      isAIPath ? sourceCtx : requirementCtx;

    const fileSize = files.reduce((total, file) => total + file.size, 0);
    const formatBytes = (bytes) => {
      if (!bytes) return "0 KB";
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
    };

  return (
    <div className='pt-5'>
        <div className='w-[250px] h-fit mr-[30px] rounded shadow-11 p-5 text-black '>
            <h1 className='mb-2 font-bold'>Sources</h1>
            <div className='justify-items mb-2'>
                <p className='text-sm font-mono text-gray-500 flex items-center gap-2'><FileText size={15} />{files.length} Document</p>
                <p>{formatBytes(fileSize)}</p>
            </div>
            <div className='justify-items mb-2'>
                <p className='text-sm font-mono text-gray-500 flex items-center gap-2'><NotepadText size={15} />{snippets.length} Text</p>
                <p>{snippets.length} KB</p>
            </div>
            <div className='justify-items mb-2'>
                <p className='text-sm font-mono text-gray-500 flex items-center gap-2'><MessagesSquare size={15} />{qaSnippets.length} Q & A</p>
                <p>{qaSnippets.length} KB</p>
            </div>
            <div className='justify-items pb-4 border-b border-gray-300'>
                <p className='text-sm font-mono text-gray-500 flex items-center gap-2'><Globe size={15} />{links.length} Links</p>
                <p>{links.length}/0</p>
            </div>
            <div className='justify-items mt-4 mb-2'>
                <p className='text-sm font-mono text-gray-400'>Total Storage Used {files.length}</p>
                <p>{files.length} KB</p>
            </div>
            <div className='justify-items mb-4'>
                <p className='text-sm font-mono text-gray-400'>Total Storage Limit {files.length}</p>
                <p>{files.length} KB</p>
            </div>


            <button 
            // onClick={uploadToS3} 
            className={`${files.length === 0 && links.length === 0 && snippets.length === 0 && qaSnippets.length === 0 ? 'h-[40px] w-full border border-gray-300 bg-gray-200 rounded text-gray-500 font-semibold' : 'h-[40px] w-full border border-gray-300 bg-green-500 text-white font-bold rounded hover:bg-green-400 transition duration-150'} `}>
                Train Chatbot
            </button>
        </div>
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

export default SourceRight