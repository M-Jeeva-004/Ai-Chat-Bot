import React from 'react';
import { FileText } from "lucide-react";

const SourceRight = ({files, content, uploadToS3}) => {
  return (
    <div className='pt-5'>
        <div className='w-[350px] h-[220px] mr-[30px] rounded shadow-11 p-5 text-black '>
            <h1 className='mb-2 text-[20px] font-bold'>Sources</h1>
            <p className='mb-2 text-[16px] font-mono text-gray-500 flex items-center gap-2'><FileText size={15} />{files.length} {content}</p>
            <p className='mb-10 text-[16px] font-mono text-gray-400'>Total: {files.length}/0</p>

            <button onClick={uploadToS3} 
            className={`${files.length == 0 ? 'h-[40px] w-full border border-gray-300 bg-gray-200 rounded text-gray-500 font-semibold' : 'h-[40px] w-full border border-gray-300 bg-green-500 text-white font-bold rounded hover:bg-green-400 transition duration-150'} `}>
                Train Chatbot
            </button>
        </div>
    </div>
  )
}

export default SourceRight