"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Plus, Search, ChevronRight, UserRoundCheck, ScanSearch, BriefcaseBusiness } from "lucide-react";
import { workspaceData } from "../data/workspace";

const Workspace = () => {
    const [workspace, setWorkspace] = useState(workspaceData);
    const [searchWorkAgent, setSearchWorkAgent] = useState('');
    const [companyName, setCompanyName] = useState("");
    const [opportunityName, setOpportinutyName] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");
    const [companyLink, setCompanyLink] = useState("");
    const [openCreateWorkspace, setOpenCreateWorkspace] = useState(false);
    const [animateOut, setAnimateOut] = useState(false);

    const handleCreateWorkspace = (e) => {
        e.preventDefault()
        if (opportunityName === "" || companyName === "" || companyDescription === "" || companyLink === "") return;

        const newWorkAgent = {
            id: crypto.randomUUID(),
            opportunityName: opportunityName,
            companyName: companyName,
            description: companyDescription,
            website: companyLink
        };

        setWorkspace(prev => [...prev, newWorkAgent]);
        console.log(workspace, "Workspace")
        setCompanyName("");
        setOpportinutyName("");
        setCompanyDescription("");
        setCompanyLink("");
        setOpenCreateWorkspace(false);
    };
    
    const filteredWorkspace = workspace.filter((ws) => ws.companyName.toLowerCase().includes(searchWorkAgent.toLowerCase()));

  return (
    <div className='flex flex-col relative w-full h-full text-black'>
        {openCreateWorkspace && (
            <div className="h-screen w-full bg-black/80 absolute -top-16 -left-20 z-50 flex items-center justify-center p-5" style={{width:"-webkit-fill-available"}}>
            <div className={`bg-white w-[60%] min-w-[600px] h-[90%] overflow-y-auto rounded p-5 ${animateOut ? "popup-out" : "popup-in"}`}>
                <h2 className="text-black font-bold text-[20px]">Create AI Workspace</h2>
                <form onSubmit={handleCreateWorkspace}>
                    <p className="text-gray-500 text-sm mt-5">Opportunity Name <span className="text-red-500">*</span></p>
                    <input type="text" 
                    value={opportunityName}
                    onChange={(e) => setOpportinutyName(e.target.value)} 
                    placeholder="Enter Opportunity name" 
                    required
                    className='form-input border-l-2! border-l-green-500! text-gray-500' />

                    <p className="text-gray-500 text-sm mt-5">Company Name <span className="text-red-500">*</span></p>
                    <input type="text" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)} 
                    placeholder="Enter Company name" 
                    required
                    className='form-input border-l-2! border-l-green-500! text-gray-500' />

                    <p className="text-gray-500 text-sm mt-5">Company Website <span className="text-red-500">*</span></p>
                    <input type="url" 
                    value={companyLink}
                    onChange={(e) => setCompanyLink(e.target.value)} 
                    placeholder="Enter Company Website link" 
                    required
                    className='form-input border-l-2! border-l-green-500! text-gray-500' />

                    <p className="text-gray-500 text-sm mt-5">Opportunity Description <span className="text-red-500">*</span></p>
                    <textarea type="text" 
                    value={companyDescription}
                    rows={5}
                    onChange={(e) => setCompanyDescription(e.target.value)} 
                    placeholder="Enter Company Description" 
                    required
                    className='border-l-2! border-l-green-500! text-gray-500 border border-gray-400 w-full rounded mt-2 px-4 py-2 text-[14px] font-semibold focus:border-green-500 outline-none focus:outline-none focus:ring-1 focus:ring-green-500 hover:border-green-500' />


                    <div className="flex flex-col w-[50%] mt-8 p-5 border border-green-500 bg-green-100 rounded cursor-pointer">
                    <Image 
                    src={"/ai-icon.png"}
                    alt="Ai icon"
                    height={20}
                    width={20}
                    />

                    <h1 className="text-black font-bold mt-5 mb-1">AI Workspace</h1>
                    <p className="text-gray-500 text-sm">An intelligent chat assistant powered by RAG technology that provides customer support across Web, WhatsApp</p>
                    </div>

                    <div className="flex gap-3 justify-end mt-5 text-sm">
                    <button onClick={()=> setOpenCreateWorkspace(false)} 
                    className="border border-gray-400 text-black bg-gray-200 rounded-2xl px-3 py-1 hover:border-green-500 hover:text-green-500 transition duration-200">Cancel</button>
                    <button type="submit" className="border border-gray-400 text-white bg-green-500 rounded-2xl px-3 py-1 hover:bg-green-400 transition duration-200 stroke-green-500">Create Workspace</button>
                    </div>
                </form>
            </div>
            </div>
        )}
        <div className='h-[60px] bg-gray-100 pl-[30px] text-black flex items-center ai-head'>
            <p className="flex items-center  text-1xl font-bold">Workspace 
              <Image 
                src="/right-arrow.svg"
                alt=""
                width={30}
                height={20}
            /></p>
        </div>

        <div className="px-5 py-3">
            {workspace.length === 0 ? (
                <div className="flex flex-col h-full p-5">
                    <p className="text-gray-500 text-sm">Create and deploy intelligent AI Workspace and that provide instant, personalized responses to customer inquiries across all your support channels.</p>

                    <div className="flex flex-col gap-2 mt-10 p-8 border border-gray-300 rounded bg-gray-100">
                    <h1 className="text-black text-2xl">Start Building Your AI Workspace</h1>
                    <p className="text-gray-500 text-sm">Easily create AI Workspace by uploading your knowledge base - no complex flow setup required</p>

                    <div className="flex gap-2 items-center mt-5">
                        <span className="bg-green-200 border border-green-500 p-1 rounded-full">
                        <UserRoundCheck size={20} color="oklch(72.3% 0.219 149.579)" />
                        </span>
                        <p className="text-gray-500 text-sm">Create natural, human-like conversations that engage your customers.</p>
                    </div>
                    <div className="flex gap-2 items-center mt-1">
                        <span className="bg-green-200 border border-green-500 p-1 rounded-full">
                        <ScanSearch size={20} color="oklch(72.3% 0.219 149.579)" />
                        </span>
                        <p className="text-gray-500 text-sm">Provide 24/7 multilingual support with precise, context-aware responses.</p>
                    </div>

                    <button onClick={()=> setOpenCreateWorkspace(true)} className="flex-items w-fit px-4 py-2 bg-green-500 text-white rounded-[25px] hover:bg-green-400 transition mt-4">
                        <BriefcaseBusiness size={20} />
                        Create Workspace
                    </button>
                    </div>
                </div>
            ) : (
            <>
            <div className="flex justify-end gap-3 w-full mb-6">
                <div className="flex-items bg-green-500 text-white w-44 h-10 pl-5 pr-2 rounded-full hover:bg-green-400 transition duration-300 cursor-pointer shadow-5">
                    <input type="text" 
                    placeholder="Search"
                    value={searchWorkAgent}
                    onChange={(e)=> setSearchWorkAgent(e.target.value)}
                    className="w-full outline-none bg-transparent text-white placeholder:text-white h-[35px]" />
                    <div className="bg-white text-green-500 p-1 rounded-full"><Search size={20} /></div>
                </div>

                <div onClick={()=> setOpenCreateWorkspace(true)} className="flex-items bg-green-500 text-white w-44 h-10 pl-3 rounded-full hover:bg-green-400 transition duration-300 cursor-pointer shadow-5">
                    Add Workspace
                    <div className="bg-white text-green-500 p-1 rounded-full"><Plus size={20} /></div>
                </div>
            </div>

            <div className="flex flex-col relative shadow-11 w-full h-[70dvh] p-5 rounded">
                <div className="">
                    <div className="flex font-bold">
                        <div className="w-[30%] min-h-15 h-auto flex-items shadow-11 rounded px-5 py-1 mb-2">
                            <h2 className="justify-center">Opportunity Name</h2>
                        </div>
                        <div className="w-full min-h-15 h-auto flex-items gap-5 shadow-11 rounded px-5 py-1 mb-2">
                            <h2 className="justify-center">Opportunity Description</h2>
                        </div>
                    </div>

                    <div className="relative overflow-auto h-full">
                {filteredWorkspace.map((work, idx) => (
                    <div key={idx} className="min-h-15 h-auto flex gap-5 items-center justify-between shadow-11 rounded px-5 py-1 my-2 mx-0.5">
                        <div className="flex items-center gap-3 w-[20%]">
                            {/* <Image 
                                src="/Header/Profile.png"
                                alt="Profile image"
                                height={50}
                                width={50}
                                className="w-8"
                            /> */}
                            <p className="bg-green-500 h-10 w-10 flex-items text-white border-2 border-green-200 rounded-full">{work.companyName.slice(0, 1)}</p>

                            <p>{work.opportunityName}</p>
                        </div>

                        <div className="w-[70%]">
                            <p>{work.description}</p>
                        </div>
                        <Link href={`/workspace/${work.id}/opportunity-workspace`}>
                            <div className="bg-gray-300 p-1 rounded-full cursor-pointer hover:bg-gray-400 hover:text-white transition duration-200">
                                <ChevronRight />
                            </div>
                        </Link>
                    </div>
                ))}
                    </div>

                </div>
            </div>
            </>
            )}
        </div>
    </div>
  )
}

export default Workspace