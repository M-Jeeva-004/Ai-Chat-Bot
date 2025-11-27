"use client";
import { createContext, useContext, useState } from "react";

const SourcesContext = createContext(null);

export const useSources = () => useContext(SourcesContext);

export function SourcesProvider({ children }) {
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

  const LAMBDA_URL = "https://vubyvd7ejneqaldnwm7ed53efu0omwvm.lambda-url.ap-south-1.on.aws/";

  const uploadToS3 = async () => {
    if (files.length === 0 && links.length === 0 && snippets.length === 0 && qaSnippets.length === 0) {
    //   alert("Please upload a file first.");
      setNotification({
        message: "Please upload a file first",
        visibility: true,
        type: "error",
        });
        setTimeout(
        () => setNotification((prev) => ({ ...prev, visibility: false })),
        3000
        );
      return;
    }

    try {
      const filenamesParam = files.map((f) => f.name).join(",");
      const res = await fetch(
        `${LAMBDA_URL}?action=generate_urls&filenames=${filenamesParam}`
      );
      const data = await res.json();

      const presignedUrls = data.urls;
      const currentSessionId = data.session_id;
      setSessionId(currentSessionId);

      for (let file of files) {
        const uploadUrl = presignedUrls[file.name];
        const uploadRes = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
        });

        if (!uploadRes.ok) {
          setNotification({
            message: `Failed to upload ${file.name}`,
            visibility: true,
            type: "error",
          });
          setTimeout(
            () => setNotification((prev) => ({ ...prev, visibility: false })),
            3000
          );
        }
      }

      setNotification({
        message: "File(s) uploaded successfully",
        visibility: true,
        type: "success",
      });
      setTimeout(
        () => setNotification((prev) => ({ ...prev, visibility: false })),
        3000
      );
    } catch (err) {
      console.error(err);
      setNotification({
        message: "Error uploading files",
        visibility: true,
        type: "error",
      });
      setTimeout(
        () => setNotification((prev) => ({ ...prev, visibility: false })),
        3000
      );
    }

    setFiles([]);
    setLinks([]);
    setSnippets([]);
    setQaSnippets([]);
  };

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
    uploadToS3,
  };

  return (
    <SourcesContext.Provider value={value}>
      {children}
    </SourcesContext.Provider>
  );
}
