'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { aiAgents } from "../data/playground";
import { Plus, UserRoundCheck, ScanSearch, Bot, Pencil, MessageSquareMore, Copy } from "lucide-react";

const page = () => {
  const [agents, setAgents] = useState(aiAgents);
  const [openCreateAgent, setOpenCreateAgent] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [agentName, setAgentName] = useState('');
  const [searchAgent, setSearchAgent] = useState("");
  const [showError, setShowError] = useState(false);

  const handleCreateAgent = () => {
    if (agentName === "") {
      setShowError(true);
      setTimeout(()=> {
        setShowError(false)
      }, 3000)
      return
    }

    const newAgent = {
      agentId: crypto.randomUUID(),
      name: agentName,
    };

    setAgents(prev => [...prev, newAgent]);

    setAgentName('');
    setOpenCreateAgent(false);
  };

  const filterAgents = agents.filter((agent) => agent.name.toLowerCase().includes(searchAgent.toLowerCase()));

  return (
    <div className='relative w-full h-full'>
      {openCreateAgent && (
        <div className="h-screen w-full bg-black/80 absolute -top-16 -left-20 z-50 flex justify-center p-5" style={{width:"-webkit-fill-available"}}>
          <div className={`bg-white w-[60%] min-w-[600px] h-fit mt-30 rounded p-5 ${animateOut ? "popup-out" : "popup-in"}`}>
            <h2 className="text-black font-bold text-[20px]">Create AI Agent</h2>
            <p className="text-gray-500 text-sm mt-5">What would you like to call your agent? (Internal reference) <span className="text-red-500">*</span></p>

            <input type="text" 
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)} 
            placeholder="Enter Agent name" 
            className='form-input border-l-2! border-l-green-500! text-gray-500' />
            {showError && <p className="text-red-500 text-sm pt-1">Enter the above field</p>}

            <div className="flex flex-col w-[50%] mt-8 p-5 border border-green-500 bg-green-100 rounded cursor-pointer">
              <Image 
               src={"/ai-icon.png"}
               alt="Ai icon"
               height={20}
               width={20}
              />

              <h1 className="text-black font-bold mt-5 mb-1">AI Chat Agent</h1>
              <p className="text-gray-500 text-sm">An intelligent chat assistant powered by RAG technology that provides customer support across Web, WhatsApp</p>
            </div>

            <div className="flex gap-3 justify-end mt-5 text-sm">
              <button onClick={()=> setOpenCreateAgent(false)} 
              className="border border-gray-400 text-black bg-gray-200 rounded-2xl px-3 py-1 hover:border-green-500 hover:text-green-500 transition duration-200">Cancel</button>
              <button onClick={handleCreateAgent} className="border border-gray-400 text-white bg-green-500 rounded-2xl px-3 py-1 hover:bg-green-400 transition duration-200 stroke-green-500">Create bot</button>
            </div>
          </div>
        </div>
      )}
        <div className='h-[60px] bg-gray-100 pl-[30px] text-black flex items-center ai-head'>
            <p className="flex items-center  text-1xl font-bold">AI Agent 
              <Image 
                src="/right-arrow.svg"
                alt=""
                width={30}
                height={20}
            /></p>
        </div>

        <div className='h-[60px] bg-gray-100 pl-[30px] text-black justify-items ai-head'>
            <p className="flex items-center text-1xl font-bold">My Agents</p>

            <div className="group flex items-center px-4 py-0 rounded-md border-2 border-gray-400 overflow-hidden max-w-md mr-5 h-[35px] hover:border-green-500 focus-within:border-green-500">
              <input type="text" 
                placeholder="Search"
                value={searchAgent}
                onChange={(e)=> setSearchAgent(e.target.value)}
                className="w-full outline-none bg-transparent text-gray-600 text-sm h-[35px]" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-400 group-hover:fill-green-500">
                <path
                  d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                </path>
              </svg>
            </div>
        </div>


        {agents.length === 0 ? 
          <div className="flex flex-col h-full p-5">
            <p className="text-gray-500 text-sm">Create and deploy intelligent AI Agents and Chatbots that provide instant, personalized responses to customer inquiries across all your support channels.</p>

            <div className="flex flex-col gap-2 mt-10 p-8 border border-gray-300 rounded bg-gray-100">
              <h1 className="text-black text-2xl">Start Building Your AI Agent</h1>
              <p className="text-gray-500 text-sm">Easily create powerful AI Agents by uploading your knowledge base - no complex flow setup required</p>

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

              <button onClick={()=> setOpenCreateAgent(true)} className="flex-items w-fit px-4 py-2 bg-green-500 text-white rounded-[25px] hover:bg-green-400 transition mt-4">
                <Bot size={20} />
                Create Ai Agent
              </button>

            </div>
          </div>
        :
          <div className="flex h-full justify-items-start lg:flex-row max-sm:flex-col sm:flex-col items-start gap-10 mt-[30px] ml-[30px]">
            <div onClick={()=> setOpenCreateAgent(true)} className=" flex-items-2 flex-col h-[150px] w-[300px] shadow-5 rounded-[10px] max-sm:w-[90%] cursor-pointer text-black hover:text-green-500 transition duration-150">
              <Plus size={25} color="oklch(72.3% 0.219 149.579)" strokeWidth={2.5} />
              <p className="font-bold text-[20px]">Create Bot</p>
            </div>
            {filterAgents.map(({name, agentId}, idx) => (
              <div key={idx} className=" flex justify-around px-5 flex-col h-[150px] w-[300px] max-sm:w-[90%] shadow-5 rounded-[10px] ">
                <Link
                  href={`/ai/${agentId}/playground`}
                >
                <div className="flex flex-row items-center gap-2 ">
                  <Image
                  className="border-2 border-green-600 rounded-[50%] p-0"
                    src="/AI Home/Robot.png"
                    alt="ai-plus"
                    width={50}
                    height={20}
                  />

                  <p className="text-black font-bold text-[20px] hover:text-green-500 transition duration-200">{name}</p>
                </div>
                </Link>
                

                <div className="flex items-center h-8 justify-between w-full pl-3">
                  <div className="relative group">
                    <Image 
                      src="/ai-icon.png"
                      alt="ai-plus"
                      width={15}
                      height={20}
                    />
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                                    whitespace-nowrap px-3 py-2 text-sm font-medium text-white
                                    bg-gray-800 rounded-md shadow-md opacity-0 invisible
                                    group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      Ai Bot
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/ai/${agentId}/settings`}>
                      <div className="relative group hover:bg-gray-100 hover:text-gray-500 text-black px-1 py-3 h-8 w-8 flex items-center justify-center rounded-full transition duration-300 cursor-pointer">
                        <Pencil size={18} />

                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                                        whitespace-nowrap px-3 py-2 text-sm font-medium text-white
                                        bg-gray-800 rounded-md shadow-md opacity-0 invisible
                                        group-hover:opacity-100 group-hover:visible transition-all duration-300">
                          Edit
                          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                        </div>
                      </div>
                    </Link>

                    <Link href={`/ai/${agentId}/chatlog`}>
                      <div className="relative group hover:bg-gray-100 hover:text-gray-500 text-black px-1 py-3 h-8 w-8 flex items-center justify-center rounded-full transition duration-300 cursor-pointer">
                        <MessageSquareMore size={18} />

                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                                        whitespace-nowrap px-3 py-2 text-sm font-medium text-white
                                        bg-gray-800 rounded-md shadow-md opacity-0 invisible
                                        group-hover:opacity-100 group-hover:visible transition-all duration-300">
                          Responses
                          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                        </div>
                      </div>
                    </Link>

                    <div className="relative group hover:bg-gray-100 hover:text-gray-500 text-black px-1 py-3 h-8 w-8 flex items-center justify-center rounded-full transition duration-300 cursor-pointer">
                      <Copy size={18} />

                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                                      whitespace-nowrap px-3 py-2 text-sm font-medium text-white
                                      bg-gray-800 rounded-md shadow-md opacity-0 invisible
                                      group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        Clone
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            ))}
            
        </div>
         }
        
       
    </div>
  )
}

export default page