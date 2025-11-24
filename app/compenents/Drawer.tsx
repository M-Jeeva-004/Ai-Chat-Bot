'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathName = usePathname();

  return (
    <>
      {/* Sidebar */}
      <div
        className={`${pathName === '/ai/topics' ? 'h-[42rem] top-10 mt-16.5' : 'h-screen'} z-10 max-h-[100dvh] sticky pt-[68px] ${isCollapsed ? 'w-20' : 'w-64'} bg-gray-100 flex flex-col justify-between p-4 border-r border-gray-200 transition-all duration-100`}
      >
        <div className={`${pathName === '/ai/topics' ? 'relative -top-14' : 'pt-2.5'}`}>
          <nav className="space-y-2">
            <div className="relative group">
              <Link
                href="/dashboard"
                className={`dashboard-active ${isCollapsed ? 'justify-center ' : 'justify-start'} ${pathName.startsWith("/dashboard") && "bg-green-400"}`}
              >

                <Image
                  src="/dashboard.png"
                  alt="dashboard icon"
                  width={50}
                  height={50}
                  className='h-5 w-5'
                />
                <span className={`${isCollapsed ? "opacity-0 absolute" : "block delay-200"} transition-all ease-in`}>Dashboard</span>
              </Link>
              {/* Tooltip */}
                <div
                    id="tooltip-dashboard"
                    role="tooltip"
                    className={`tooltip ${isCollapsed ? "block" : "hidden"}`}
                >
                    Dashboard
                    <div className="tooltip-point"></div>
                </div>
            </div>
            
            <div className="relative group">
              <Link
                href="/knowledge"
                className={`dashboard-active ${isCollapsed ? 'justify-center ' : 'justify-start'} ${pathName.startsWith("/knowledge") && "bg-green-400"}`}
              >

                <Image
                  src="/book-icon.png"
                  alt="knowledge icon"
                  width={20} height={20}
                  className='w-[20px]'
                />
                <span className={`${isCollapsed ? "opacity-0 absolute" : "block delay-200"} transition-all`}>Knowledge Base</span>
                
              </Link>
              {/* Tooltip */}
                <div
                    id="tooltip-dashboard"
                    role="tooltip"
                    className={`tooltip ${isCollapsed ? "block" : "hidden"}`}
                >
                    Knowledge Base
                    <div className="tooltip-point"></div>
                </div>
            </div>

            <div className="relative group">
              <Link
                href="/chat"
                className={`dashboard-active ${isCollapsed ? 'justify-center ' : 'justify-start'} ${pathName.startsWith("/chat") && "bg-green-400"}`}
              >
                <Image
                  src="/Vector.png"
                  alt="vector icon"
                  width={20} height={20}
                />
                <span className={`${isCollapsed ? "opacity-0 absolute" : "block delay-200"} transition-all`}>Live Chat</span>
              </Link>
              {/* Tooltip */}
                <div
                    id="tooltip-dashboard"
                    role="tooltip"
                    className={`tooltip ${isCollapsed ? "block" : "hidden"}`}
                >
                    Live Chat
                    <div className="tooltip-point"></div>
                </div>
            </div>

            <div className="relative group">
              <Link
                href='/ai'
                className={`dashboard-active ${isCollapsed ? 'justify-center ' : 'justify-start'} ${pathName.startsWith("/ai") && "bg-green-400"}`}
              >
                <Image
                  src="/ai-icon.png"
                  alt="Ai icon"
                  width={20} height={20}
                />
                <span className={`${isCollapsed ? "opacity-0 absolute" : "block delay-200"} transition-all`}>Ai Agent</span>
              </Link>

              {/* Tooltip */}
                <div
                    id="tooltip-dashboard"
                    role="tooltip"
                    className={`tooltip relative z-50 ${isCollapsed ? "block" : "hidden"}`}
                >
                    Ai Agent
                    <div className="tooltip-point"></div>
                </div>
            </div>
          </nav>
        </div>

        {/* Collapse Toggle Button */}
        <div className="flex justify-end pr-2">
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="p-2 rounded-md hover:bg-gray-200 transition"
          >
            {isCollapsed ? (
              <ChevronsRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronsLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      )}
    </>
  );
}
