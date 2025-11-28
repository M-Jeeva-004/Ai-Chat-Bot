"use client"
import { useState } from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { workspaceData } from "../../../data/workspace";

const RequirementAnalytics = () => {
    const pathName = usePathname();
    const parts = pathName.split("/");
    const agentId = parts[2];
    
    const [messages, setMessages] = useState([]); 

    const filterData = workspaceData.filter((work) => work.id.includes(agentId));
    // console.log(filterData[0].opportunityName, "FILTER DATA");
    const prompt = `
    This is divided by Modules. For Each Module it displays a table with following details. 
    1) ${filterData[0].opportunityName} 
    2) ${filterData[0].companyName}  
    3) ${filterData[0].description}  
    4) ${filterData[0].website}  
    You are the Salesforce or Other Tech Technical & Solution Architect responsible for analyzing client requirements after the introductory call or after we receive an initial set of Scope or Requirement details. 

    Your task: 

    Review the details provided to understand the client’s needs. 

    Identify and document follow-up questions, if any, to clarify missing or unclear aspects necessary for estimation. 

    If the information provided is sufficient to estimate, confirm that no further questions are needed. `
    console.log(prompt, "PROMPT")
    const handleMessage = async (e) => {
        e.preventDefault();
        const trimmed = prompt.trim();
        if (!trimmed) return;
    
        const userMessage = trimmed;
        setMessages((prev) => [...prev,  { sender: "user", text: userMessage, timeStamp: new Date().toISOString() }]);
        
        // setInput("");

        const thinkingIndex = messages.length + 1; // this will be replaced later
        setMessages(prev => [
        ...prev,
        {
            sender: "bot",
            text: "Thinking...",
            loading: true,
            // timeStamp: new Date().toISOString()
        }
        ]);

        try {
        // 🔹 Fetch Salesforce token (ideally only once, not per message)
        const res = await fetch("http://localhost:4000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        if (!res.ok) {
            throw new Error(`API responded with ${res.status}`);
        }

        const data = await res.json();
        const botText =
            data.reply || data.error || "⚠️ No response from AI.";
        
        setMessages(prev =>
            prev.map((msg, idx) =>
            idx === thinkingIndex
                ? {
                    sender: "bot",
                    text: botText,
                    loading: false,
                    timeStamp: new Date().toISOString(),
                    like: false,
                    dislike: false
                }
                : msg
            )
        );

        } catch (err) {
            console.error("Request failed:", err);

            const errorMessage =
                err.message === "Failed to fetch"
                ? "⚠️ Cannot connect to AI server."
                : "⚠️ Something went wrong.";

            setMessages(prev =>
                prev.map((msg, idx) =>
                idx === thinkingIndex
                    ? {
                        sender: "bot",
                        text: errorMessage,
                        loading: false,
                        timeStamp: new Date().toISOString(),
                        like:false,
                        dislike:false
                    }
                    : msg
                )
            );
        }
        
    };
    console.log(messages, "Messages");

  return (
    <div className="h-full flex flex-col max-sm:flex-col absolute pt-43.5 top-0 overflow-auto" style={{ width: "-webkit-fill-available" }}>

        <div className="flex justify-end gap-3 w-full p-5">
            <div onClick={handleMessage} className="flex-items bg-green-500 text-white w-60 h-10 py-3 rounded-full hover:bg-green-400 transition duration-300 cursor-pointer shadow-5">
                Run the Requirement Analysis
            </div>
        </div>

        <div className="text-black h-full overflow-y-auto">
            {messages.map((msg, idx) => (
                <div key={idx} className={`${idx % 2 === 1 ? "block" : "hidden"} chat-message`}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                        li: ({ children }) => <li className="list-item">{children}</li>,
                        ul: ({ children }) => <ul className="unordered">{children}</ul>,
                        ol: ({ children }) => <ol className="ordered">{children}</ol>,
                        }}
                    >
                        {msg.text}
                    </ReactMarkdown>
                </div>
            ))}
        </div>
    </div>
  )
}

export default RequirementAnalytics