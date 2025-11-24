'use client';
import TopicsHead from './Topics/TopicsHead';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { sparkData } from '../data/spark-head';

const Spark = () => {
  const pathName = usePathname();

  // ✅ Full match to remove layout on specific route |
  if (pathName.startsWith('/ai/custom-action')) {
    return (

      <TopicsHead href='/ai/topics' label='Custom Actions' />

    ); // Completely skip layout
  } else if (pathName.startsWith('/ai/topics/topic-details')) {
    return (
      <div className='fixed top-[65px] w-full h-fit z-10'>
        <TopicsHead href='/ai/topics' label='Topic Details' />
      </div>

    )
  };

  return (
    <div className={`w-full h-fit ${['/ai/topics', '/ai/settings/chat'].includes(pathName) ? 'z-0' : 'z-1'}`}>
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
          Agent Spark
          <Image src='/right-arrow.svg' alt='' width={30} height={20} className='w-[30px]' />
        </p>
      </div>

      <div className='h-[50px] bg-gray-100 pl-[30px] text-black flex items-center ai-head md:gap-2 md:0'>
        {sparkData.map(({ label, href, disabled }) => {
          const isActive = pathName.startsWith(href);

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
                <Link href={href}>
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
