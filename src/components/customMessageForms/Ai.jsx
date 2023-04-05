import { usePostAiTextMutation } from "@/state/api";
import React, { useState, useEffect } from "react";
import MessageFormUI from "./MessageFormUI";
import { HandRaisedIcon } from "@heroicons/react/24/solid";

const Ai = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [trigger] = usePostAiTextMutation();

  const handleChange = (e) => {
    
    setMessage(e.target.value)
  };
  const handleKeyDown = e => {
    

    if (e.key === 'Enter' && message) {
      // 👇️ your logic here
      
      handleSubmit();
      
    }
    
    
   
  };

  

  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+05:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };
    
    props.onSubmit(form);
    trigger(form);
    setMessage("");
    setAttachment("");
  };

  return (
    <MessageFormUI
      handleKeyDown={handleKeyDown}
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Ai;
