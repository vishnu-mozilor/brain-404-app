import React from "react";
import { useState } from "react";
import { getChatResponse } from "../../chatService";
import Card from '../common/Card';

function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const chatResponse = await getChatResponse(input);
      setResponse(chatResponse);
    } catch (error) {
      console.error("Error getting chat response:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <Card title="Pending Tickets" value="15" className="bg-blue-100" />
      <Card title="AI Responded Tickets" value="30" className="bg-yellow-100" />
      <Card title="New Tickets" value="10" />
      <Card title="First Response Time" value="2h 30m" className="bg-purple-100" />
    </div>
  );
}

export default Home;
