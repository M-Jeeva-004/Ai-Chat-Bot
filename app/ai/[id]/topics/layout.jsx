'use client'
import Leftbar from "@/app/compenents/Leftbar";
import { ActionsData } from "@/app/data/leftbar-data";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {

  const pathName = usePathname()
  const parts = pathName.split("/");
  const agentId = parts[2];

  if (pathName.startsWith(`/ai/${agentId}/topics/topic-details`)) {
    return <>{children}</>
  } else {

    return (
      <>
        <div className="flex h-full lg:flex-row md:flex-row max-sm:flex-col fixed top-[174px] pb-[174px] w-[-webkit-fill-available]">
          <div className='flex flex-col text-black border-r border-r-gray-200 shadow w-[20%] min-w-[200px] max-sm:w-full'>
            <ul className='pt-5 pl-4 w-full '>
              {ActionsData.map(({ label, icon, greenIcon, href }, index) => (
                <Leftbar
                  key={index}
                  label={label}
                  icon={icon}
                  greenIcon={greenIcon}
                  href={`/ai/${agentId}/${href}`}
                />
              ))}
            </ul>
          </div>
          {children}


        </div>
      </>
    )
  }
}
