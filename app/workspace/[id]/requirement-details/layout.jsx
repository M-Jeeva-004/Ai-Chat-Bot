"use client";
import { usePathname } from "next/navigation";
import { RequirementProvider } from "@/app/context/WorkspaceContext";
import { WorkLeftbarData } from "../../../data/workspace";
import Leftbar from "@/app/compenents/Leftbar";
import SourceRight from "@/app/compenents/SourceRight";

const layout = ({ children }) => {
  const pathName = usePathname();
  const parts = pathName.split("/");
  const agentId = parts[2];


  return (
    <RequirementProvider>
        <div
        className="h-full flex lg:flex-row md:flex-row max-sm:flex-col absolute pt-43.5 top-0"
        style={{ width: "-webkit-fill-available" }}
        >
          <div className="flex flex-col text-black border-r border-r-gray-200 shadow w-[20%] min-w-[170px] max-sm:w-full">
            <ul className="pt-5 pl-4 w-full ">
              {WorkLeftbarData.map(({ label, icon, greenIcon, href }, index) => (
                
                <Leftbar
                  key={index}
                  label={label}
                  icon={icon}
                  greenIcon={greenIcon}
                  href={`/workspace/${agentId}/${href}`}
                />
              ))}
            </ul>
          </div>

          { children }

          <SourceRight />
        </div>
    </RequirementProvider>
  )
}

export default layout