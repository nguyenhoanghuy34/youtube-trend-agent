import { useState } from "react";
import { Bot } from "lucide-react";

import { sendChatMessage } from "../../api/chatApi";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";


import ThinkingIndicator from "./ThinkingIndicator";

export default function ChatPanel({ onVideosUpdate, theme = "light" }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      message:
        "Hi! I’m your Trend Intelligence Agent. Ask me anything.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    const userMessage = input.trim();

    if (!userMessage || loading) {
      return;
    }

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        message: userMessage,
      },
    ]);

    setLoading(true);

    try {
      const data = await sendChatMessage(userMessage);

      // Update Report panel
if (data.trend_data && onVideosUpdate) {
  const sortedVideos = [...data.trend_data].sort(
    (a, b) => a.rank - b.rank
  );

  onVideosUpdate(sortedVideos);
}

      // Update Chat
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          message: data.response,
        },
      ]);

    } catch (error) {
      console.error("Chat API error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          message:
            "Sorry, I couldn't connect to the agent.",
        },
      ]);

    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex h-full min-h-0 flex-col">

      {/* Header */}
      <div className={`border-b px-5 py-4 ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}>
        <div className="flex items-center gap-3">

          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
            <Bot size={18} />
          </div>

          <div>
            <h2 className={`text-sm font-semibold ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>
              AI Agent
            </h2>

            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
              Ask about trends and marketing
            </p>
          </div>

        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-5">

        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            message={message.message}
            theme={theme}
          />
        ))}

{loading && (
  <ThinkingIndicator variant="ring" theme={theme} />
)}

      </div>

      {/* Input */}
      <div className={`border-t p-4 ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}>
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          loading={loading}
          theme={theme}
        />
      </div>

    </section>
  );
}
