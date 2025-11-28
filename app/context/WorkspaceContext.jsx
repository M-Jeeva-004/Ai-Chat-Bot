"use client";
import { createContext, useContext, useState } from "react";

const RequirementContext = createContext(null);

export const useRequirement = () => useContext(RequirementContext);

export function RequirementProvider({ children }) {
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const [snippets, setSnippets] = useState([]);
  const [qaSnippets, setQaSnippets] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState(["Next.js"]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    visibility: false,
    type: "",
  });

  const value = {
    files,
    setFiles,
    links,
    setLinks,
    snippets,
    setSnippets,
    qaSnippets,
    setQaSnippets,
    sessionId,
    uploadedFiles,
    setUploadedFiles,
    selectedFiles,
    setSelectedFiles,
    notification,
    setNotification,
  };

  return (
    <RequirementContext.Provider value={value}>
      {children}
    </RequirementContext.Provider>
  );
}