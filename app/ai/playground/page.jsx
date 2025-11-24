'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { MessageCirclePlus, MessageCircleX, Copy } from "lucide-react";

const Page = () => {
  const [messages, setMessages] = useState([]); // store multiple messages
  const [input, setInput] = useState(""); // store input text
  const [expand, setExpand] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [notificationSound, setNotificationSound] = useState(true);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopy = async (idx) => {
    try {
      await navigator.clipboard.writeText(messages[idx].text);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000); // hide "Copied!" after 1.2 sec
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  
  const playSound = (src) => {
    const audio = new Audio(src);
    audio.play().catch(()=> {}); // Prevent error if autoplay is blocked
  }

  const handleMessage = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
  
    const userMessage = trimmed;
    setMessages((prev) => [...prev,  { sender: "user", text: userMessage, timeStamp: new Date().toISOString() }]);
    {notificationSound && (
      playSound('/Sounds/pop1.mp3')
    )}
    setInput("");

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

      {notificationSound && (
        playSound('/Sounds/pop2.wav')
      )}
    } catch (err) {
      console.error("Error logging in:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to AI.", timeStamp: new Date().toISOString(), like:false, dislike:false },
      ]);
      {notificationSound && (
        playSound('/Sounds/pop2.wav')
      )}
    }
    
  };

  const updateLike = (idx) => {
    setMessages(prev =>
      prev.map((msg, i) => {
        if (i !== idx) return msg; // unchanged

        return {
          ...msg,
          like: !msg.like,       // toggle like
          dislike: false         // reset dislike
        };
      })
    );
  };

  const updateDislike = (idx) => {
    setMessages(prev =>
      prev.map((msg, i) => {
        if (i !== idx) return msg;

        return {
          ...msg,
          dislike: !msg.dislike, // toggle dislike
          like: false            // reset like
        };
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      messages.forEach((msg, i) => {
        const el = document.getElementById(`timestamp-${i}`);
        if (el) {
          el.innerText = formatMessageTime(msg.timeStamp);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [messages]);

  const formatMessageTime = (isoDate) => {
    const now = new Date();
    const msgTime = new Date(isoDate);

    const diffMs = now - msgTime;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);

    // For the first 60 seconds → update continuously
    if (diffMin < 1) {
      if (diffSec < 1) return "Just now";
      return `${diffSec}s ago`;
    }

    // After 1 minute → show real time
    return msgTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '40px'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to content height
      // textarea.style.height = `40px`;
    }
  };



  return (
    <div className="flex-items h-full">
      <div className="h-[80%] max-h-[500px] lg:w-[60%] md:w-[80%] w-[95%] max-w-[650px] justify-items flex-col border border-gray-300 shadow-11 rounded">

        {/* Header */}
        <div className="justify-items w-full h-25 rounded px-5 shadow-53 flex items-center justify-between">
          <div className="flex-items">
            <Image src="/Header/Profile.png" alt="Profile icon" width={30} height={30} />
            <h1 className="font-bold text-black">Agent Spark</h1>
          </div>
          <div className="flex-items-2 gap-1">
            {/* <Image src="/reboot.png" alt="reboot icon" width={20} height={20} /> */}
            { expand ? 
              <i onClick={()=> setExpand(false)} className="fa-solid fa-expand text-gray-500 hover:bg-gray-200 px-2 py-[7px] rounded-full transition-all duration-300 cursor-pointer"></i> :
              <i onClick={()=> setExpand(true)} className="fa-solid fa-compress text-gray-500 hover:bg-gray-200 px-2 py-[7px] rounded-full transition-all duration-300 cursor-pointer"></i>
            }
            <i className="fa-solid fa-angle-down text-gray-500 hover:bg-gray-200 px-[7px] py-1.5 rounded-full transition-all duration-300 cursor-pointer"></i>
              <div className="relative"
                onMouseEnter={()=> setShowMenu(true)}
                onMouseLeave={()=> setShowMenu(false)}
              >
                <i className="fa-solid fa-ellipsis-vertical text-gray-500 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer"></i>
                {showMenu && (
                  <div className="absolute z-10 bg-gray-50 text-sm w-55 shadow-5 rounded p-1">
                    <div onClick={()=> {setMessages([]); setShowMenu(false)}}
                    className={`flex items-center gap-2 hover:bg-gray-200 p-2 px-2 rounded transition-all duration-200 ${messages.length === 0 ? "cursor-not-allowed text-gray-400" : "cursor-pointer text-black"}`}>
                      <MessageCirclePlus size={16} color={`${messages.length === 0 ? "#99a1af" : "#000"}`} />
                      <span>Start a new chat</span>
                    </div>
                    <div  onClick={()=> {setMessages([]); setShowMenu(false)}}
                    className={`flex items-center gap-2 hover:bg-gray-200 p-2 px-2 rounded transition-all duration-200 ${messages.length === 0 ? "cursor-not-allowed text-gray-400" : "cursor-pointer text-black"}`}>
                      <MessageCircleX size={16} color={`${messages.length === 0 ? "#99a1af" : "#000"}`} />
                      <span>End chat</span>
                    </div>
                    <div onClick={()=> {setNotificationSound(!notificationSound); setShowMenu(false)}} className="flex items-center gap-2 cursor-pointer text-black hover:bg-gray-200 p-2 px-2 rounded transition-all duration-200">
                      <i className={`fa-regular ${notificationSound ? 'fa-bell-slash' : 'fa-bell'}`}></i>
                      <span>Turn {notificationSound ? 'off' : 'on'} notification sound</span>
                    </div>
                  </div>
                )}
              </div>
          </div>
          
        </div>

        <div className="h-full w-full flex flex-col gap-2 text-black p-5 overflow-y-auto">
          {messages && (
            messages.map((msg, i) => (
              <div
              key={i}
              className={ `relative min-w-[100px] max-w-[75%] w-fit break-words px-4 py-2 shadow
                ${msg.sender === "user"
                  ? "self-end bg-green-500 text-white rounded-t-2xl rounded-bl-2xl"
                  : "self-start bg-gray-200 text-black rounded-t-2xl rounded-br-2xl"}
              `}
            >
                <span className={`text-sm ${msg.text=== "Thinking..." && 'shine-Text'}`}>{msg.text}</span>

                <div id={`timestamp-${i}`} className={`text-[10px] text-gray-700 opacity-70 ${msg.sender === "user" ? "text-left": "text-right"}`}>
                  {msg.text !== "Thinking..." && formatMessageTime(msg.timeStamp)}
                </div>

                { msg.sender === "bot" && msg.text !== "Thinking..." && <div className="absolute w-24 bg-white shadow-11 flex-items-2 gap-1 px-2 py-1 rounded-2xl -bottom-4 left-5">
                  {copied ? 
                    <i className="fa-solid fa-check text-green-500 bg-green-200 p-1.5 px-[7px] text-xs rounded-full"></i> :
                      <span onClick={()=> handleCopy(i)} className="text-gray-500 p-1.5 hover:bg-gray-200 rounded-full transition-all duration-300">
                        <Copy size={14} color="#6a7282" />
                      </span>
                  }
                  <i onClick={()=> updateLike(i)} 
                  className={`fa-regular fa-thumbs-up text-gray-500 hover:bg-gray-200 p-1.5 text-sm rounded-full transition-all duration-300 ${msg.like && "text-green-500"}`}></i>
                  <i onClick={()=> updateDislike(i)} 
                  className={`fa-regular fa-thumbs-down text-gray-500 hover:bg-gray-200 p-1.5 text-sm rounded-full transition-all duration-300 ${msg.dislike && "text-green-500"}`}></i>
                </div> }
            </div>
            ))  
          )}
          
          <div></div>
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleMessage} className="group flex text-gray-500 items-center topic-formInput px-2! rounded! w-[95%]! border m-2 shadow focus-within:border-green-500">
          <textarea
            ref={textareaRef}
            onInput={resizeTextarea} // Or use onChange
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              resizeTextarea();
            }}
            placeholder="Type here..."
            style={{
            width: '100%',
            minHeight: '40px', // Set a minimum height
            height: "40px",
            maxHeight: "100px",
            resize: 'none', // Prevent manual resizing
            overflow: 'hidden', // Hide scrollbar
            // border: '1px solid #ccc',
            outline: "none",
            padding: '8px',
            fontSize: '16px',
          }}
          className=""
        />
          <button type="submit">
            <i className="fa-regular fa-paper-plane rotate-45 text-[18px] text-green-500 hover:bg-green-200 pb-2 pt-1.5 pl-1.5 pr-2 rounded-full transition-all duration-300"></i>
          </button>
        </form>

        <div className="flex-items py-3 border-t-1 border-gray-300 w-full">
          <Image 
            src="/winfomi.png"
            alt="logo"
            height={50}
            width={50}
            className="w-15"
          />

          <p className="text-gray-500 text-sm">Powered by Winfomi</p>
        </div>

      </div>
    </div>
  );
};

export default Page;
