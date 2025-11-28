"use client";
import React, { useState } from "react";
import { workspaceData } from "../../../data/workspace";

const OpportunityWorkspace = ({ params }) => {
  const resolvedParams = React.use(params); 
  const { id } = resolvedParams; // ✅ Correct extraction
  const [workspace, setWorkspace] = useState(workspaceData);

  const matchedWorkAgent = workspace.find((work) => work.id === id);

  // Prevent crash if ID not found
  if (!matchedWorkAgent) {
    return <div className="p-10 text-red-500">Invalid Workspace ID</div>;
  }

  const [companyName, setCompanyName] = useState(matchedWorkAgent.companyName);
  const [opportunityName, setOpportunityName] = useState(
    matchedWorkAgent.opportunityName
  );
  const [companyDescription, setCompanyDescription] = useState(
    matchedWorkAgent.description
  );
  const [companyLink, setCompanyLink] = useState(matchedWorkAgent.website);

  const handleUpdateWorkspace = (e) => {
    e.preventDefault();
    if (opportunityName === "" || companyName === "" || companyDescription === "" || companyLink === "") return;

    const updated = {
      ...matchedWorkAgent,
      opportunityName,
      companyName,
      companyDescription,
      companyLink,
    };

    // Update the workspace array
    setWorkspace((prev) =>
      prev.map((work) => (work.id === id ? updated : work))
    );

  };
    // console.log(workspace, "Workspace")

  return (
    <div className="h-full flex-items-2 lg:flex-row md:flex-row max-sm:flex-col absolute pt-43.5 top-0 overflow-auto" style={{ width: "-webkit-fill-available" }}>      
      <form onSubmit={handleUpdateWorkspace} className="w-[70%] h-fit">
        <h2 className="text-black font-bold text-[20px]">Workspace</h2>

        <label htmlFor="oppname" className="text-gray-500 text-sm mt-5">
          Opportunity Name <span className="text-red-500">*</span>
        </label>
        <input
          id="oppname"
          type="text"
          value={opportunityName}
          onChange={(e) => setOpportunityName(e.target.value)}
          placeholder="Enter Opportunity name"
          required
          className="form-input border-l-2! border-l-green-500! text-gray-500 mb-4"
        />

        <label htmlFor="name" className="text-gray-500 text-sm mt-5">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter Company name"
          required
          className="form-input border-l-2! border-l-green-500! text-gray-500 mb-4"
        />

        <label htmlFor="website" className="text-gray-500 text-sm mt-5">
          Opportunity Website Link <span className="text-red-500">*</span>
        </label>
        <input
          id="website"
          type="url"
          autoComplete="url"
          value={companyLink}
          onChange={(e) => setCompanyLink(e.target.value)}
          placeholder="Enter Company Website link"
          required
          className="form-input border-l-2! border-l-green-500! text-gray-500 mb-4"
        />

        <label htmlFor="description" className="text-gray-500 text-sm mt-5">
          Opportunity Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={companyDescription}
          rows={5}
          onChange={(e) => setCompanyDescription(e.target.value)}
          placeholder="Enter Company Description"
          required
          className="border-l-2! border-l-green-500! text-gray-500 border 
                     border-gray-400 w-full rounded mt-2 px-4 py-2 text-[14px] 
                     font-semibold focus:border-green-500 outline-none 
                     focus:ring-1 focus:ring-green-500 hover:border-green-500 mb-4"
        />

        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            className="border border-gray-400 text-white bg-green-500 
                       rounded-2xl px-3 py-1 hover:bg-green-400 
                       transition duration-200"
          >
            Update Workspace
          </button>
        </div>
      </form>
    </div>
  );
};

export default OpportunityWorkspace;
