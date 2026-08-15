import { useState } from "react";
import { Bot } from "lucide-react";

import { sendChatMessage } from "../../api/chatApi";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatPanel({ onVideosUpdate }) {
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
        onVideosUpdate(data.trend_data);
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
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
            <Bot size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              AI Agent
            </h2>

            <p className="text-xs text-slate-500">
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
          />
        ))}

        {loading && (
          <div className="text-sm text-slate-400">
            Agent is thinking...
          </div>
        )}

      </div>

      {/* Input */}
      <div className="border-t border-slate-200 p-4">
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          loading={loading}
        />
      </div>

    </section>
  );
}