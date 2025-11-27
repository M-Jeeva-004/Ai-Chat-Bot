'use client';
import TopicsHead from './Topics/TopicsHead';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { sparkData } from '../data/spark-head';
import { aiAgents } from '../data/playground';

const Spark = () => {
  const pathName = usePathname();

  const parts = pathName.split("/");
  const agentId = parts[2];

  // ✅ Full match to remove layout on specific route |
  if (pathName.startsWith(`/ai/${agentId}/custom-action`)) {
    return (

      <TopicsHead href={`/ai/${agentId}/topics`} label='Custom Actions' />

    ); // Completely skip layout
  } else if (pathName.startsWith(`/ai/${agentId}/topics/topic-details`)) {
    return (
      <div className='fixed top-[65px] w-full h-fit z-10'>
        <TopicsHead href={`/ai/${agentId}/topics`} label='Topic Details' />
      </div>

    )
  };

  const matchedAgent = aiAgents.find((agent) => agent.agentId ===  agentId);
  console.log(matchedAgent, "Matched Agents")

  return (
    <div className={`w-full h-fit ${[`/ai/${agentId}/topics`, `/ai/${agentId}/settings/chat`].includes(pathName) ? 'z-0' : 'z-1'}`}>
      <div className='h-[60px] bg-gray-100 pl-[30px] text-black flex items-center shadow relative z-10'>
        <p className='flex items-center text-1xl font-bold'>
          <Link href='/ai'>
            <Image
              src='/left-arrow.png'
              alt=''
              width={20}
              height={20}
              className='mr-5 w-[20px]'
            />
          </Link>
          <span>{matchedAgent?.name || 'Unknown'}</span>
          <Image src='/right-arrow.svg' alt='' width={30} height={20} className='w-[30px]' />
        </p>
      </div>

      <div className='h-[50px] bg-gray-100 pl-[30px] text-black flex items-center ai-head md:gap-2 md:0'>
        {sparkData.map(({ label, href, disabled }) => {
          const isActive = pathName.startsWith(`/ai/${agentId}/${href}`);

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
                <Link href={`/ai/${agentId}/${href}`}>
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
  );
};

export default Spark;
