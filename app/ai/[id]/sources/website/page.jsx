'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SourceRight from '@/app/compenents/SourceRight';
import { useSources } from "@/app/context/SourcesContext";
import { FolderOpen } from "lucide-react";

const Website = () => {
  const [inputUrl, setInputUrl] = useState('');
  // const [links, setLinks] = useState([]);
  const [menuIndex, setMenuIndex] = useState(null);
  const [error, setError] = useState('');

  const {
    links,
    setLinks,
    notification,
    uploadedFiles,
  } = useSources(); 


  const handleAddLink = () => {
    if (inputUrl.trim() !== '');
    const trimmedUrl = inputUrl.trim();

    if (!trimmedUrl.startsWith('http://') && (!trimmedUrl.startsWith('https://'))) {
      setError('URL must start with http or https');
      return;
    } setError('');

    setLinks([...links, { url: inputUrl.trim(), selected: false }]);
    setInputUrl('');

  };

  const handleDeleteLink = (indexToDelete) => {
    setLinks(links.filter((_, index) => index !== indexToDelete));
    setMenuIndex(null);
  };

  const toggleCheckbox = (index) => {
    setLinks((prev) =>
      prev.map((link, i) =>
        i === index ? { ...link, selected: !link.selected } : link
      )
    );
  };

  return (
    <>
      <div className='w-[80%] flex max-lg:flex-col pb-1'>
        <div className='w-full overflow-auto p-5 scrollbar-hide'>
          <div className='flex flex-col w-full h-fit shadow-11 rounded-[5px]'>
            <div className='py-6 px-6'>
              <h1 className="text-black font-bold rounded-t pb-1">Website</h1>
              <p className='text-gray-500 text-sm'>Crawl specific web pages or submit sitemaps to continuously update your AI with the latest content. Configure included and excluded paths to refine what your AI learns.</p>
            </div>

            <div className='h-auto flex px-6 flex-col text-black'>
              <div className='h-full'>
                <p className='font-bold py-3'>Crawl Links</p>
                <div className='w-full flex gap-4 pb-5 justify-between'>
                  <div className='flex flex-col gap-2 w-[90%]'>
                    <input
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      className='text-gray-500 h-10 border hover:border-green-400 focus:border-green-400 border-gray-300 rounded px-4 shadow outline-none'
                      type="text"
                      placeholder='https://www.example.com'
                    />
                    <p className='w-full flex items-center gap-2 bg-green-100 text-sm p-2 text-green-400 border rounded'>
                      <i className="fa-solid fa-circle-info"></i>
                      This will crawl all the links starting with the URL (not including files on the website).
                    </p>
                    {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}

                  </div>
                  <button
                    onClick={handleAddLink}
                    disabled={inputUrl.trim() === ''}
                    className={`h-max p-[5px] border border-gray-300 shadow text-gray-500 min-w-[150px] rounded ${inputUrl.trim() === '' ? 'bg-gray-200 cursor-not-allowed!' : 'bg-green-500 text-white'}`}
                  >
                    Fetch More Links
                  </button>
                </div>
              </div>

              
            </div>
          </div>

          <div className='py-5 shadow-11 p-5 text-black rounded mt-3'>
                <div className='flex justify-between items-center'>
                  <h1 className='font-bold text-[20px]'>Included Links</h1>
                  <button
                    className='flex items-center gap-1 h-[30px] px-3 border border-gray-400 rounded'
                  >
                    <Image src="/SourceIcons/Add.png" alt='Add icon' height={10} width={15} />
                    Add
                  </button>
                </div>

                {links.length === 0 ? (
                  <div className='flex flex-col items-center justify-center p-10 gap-3'>
                    <Image
                      src="/folder.png"
                      alt='Folder icon'
                      width={70}
                      height={40}
                    />
                    {/* <FolderOpen size={70} color='#d1d5dc' /> */}
                    <p className=''>No Data Available</p>
                  </div>
                ) : (
                  <ul className='pt-5 space-y-3'>
                    {links.map((link, index) => (
                      <li
                        key={index}
                        className='flex justify-between items-center border border-gray-300 rounded px-4 py-2'
                      >
                        <div className='flex items-center gap-2'>
                          <input
                            type='checkbox'
                            checked={link.selected}
                            onChange={() => toggleCheckbox(index)}
                          />
                          <span className='text-sm text-black'>{link.url}</span>
                        </div>
                        <div className='relative flex-items'>
                          <button onClick={() => setMenuIndex(menuIndex === index ? null : index)}
                            className='h-[15px] w-[15px] ml-[20]'>
                            <Image
                              className='h-full w-full'
                              src="/SourceIcons/three-dots.png"
                              alt='Options'
                              width={18}
                              height={18}
                            />
                          </button>
                          {menuIndex === index && (
                            <div className='absolute top-[20] flex flex-col items-start w-max right-0 mt-2 bg-white border border-gray-300 rounded shadow p-3 z-10'>
                              <button className='mb-[10]'>
                                View Trained Data
                              </button>

                              <button
                                onClick={() => handleDeleteLink(index)}
                                className='tex-black hover:text-red-700'
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
        </div>
        <div className='pt-5'>
          {/* <SourceRight content='Link' files={links} /> */}
        </div>

      </div>
    </>
  );
};

export default Website;
