'use client';
import { usePathname } from 'next/navigation';
import { workspaceData, workHeadData } from "../data/workspace";
import Link from 'next/link';
import Image from 'next/image';

export default function ClientLayoutWrapper({ children }) {
  const pathName = usePathname();
    
  const parts = pathName.split("/");
  const workId = parts[2];

  const showHead = pathName !== '/workspace';

  const matchedWorkspace = workspaceData.find((work) => work.id === workId);

  return (
    <div className="flex w-full flex-col">
      {showHead && (
        <div>
        <div className={`w-full h-fit`}>
          <div className='h-[60px] bg-gray-100 pl-[30px] text-black flex items-center shadow relative z-[2]'>
            <p className='flex items-center text-1xl font-bold'>
              <Link href='/workspace'>
                <Image
                    src='/left-arrow.png'
                    alt=''
                    width={20}
                    height={20}
                    className='mr-5 w-[20px]'
                />
              </Link>
              <span>{matchedWorkspace?.companyName || 'Unknown'}</span>
              <Image src='/right-arrow.svg' alt='' width={30} height={20} className='w-[30px]' />
            </p>
          </div>
        </div>
      
        <div className='h-[50px] bg-gray-100 pl-[30px] text-black flex items-center ai-head md:gap-2 md:0 relative z-[1]'>
          {workHeadData.map(({ label, href, disabled }) => {
            const isActive = pathName.startsWith(`/workspace/${workId}/${href}`);

            return (
              <div key={label}>
                {disabled ? (
                  <p
                    className={`flex items-center text-[14px] lg:mx-3 mx-1 h-full lg:px-2 px:2 transition-all  font-bold ${isActive
                      ? 'border-b-2 border-green-500 text-green-500 font-semibold'
                      : 'text-gray-600 hover:text-green-500'
                      }`}
                  >
                    {label}
                  </p>
                ) : (
                  <Link href={`/workspace/${workId}/${href}`}>
                    <p
                      className={`flex items-center text-[14px] lg:mx-3 mx-1 h-full lg:px-2 px:2 transition-all font-bold ${isActive
                        ? 'border-b-2 border-green-500 text-green-500 font-semibold'
                        : 'text-gray-600 hover:text-green-500'
                        }`}
                    >
                      {label}
                    </p>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
      )}
      {children}
    </div>
  );
}
