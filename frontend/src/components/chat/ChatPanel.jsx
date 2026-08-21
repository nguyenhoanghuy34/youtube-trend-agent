import { useEffect, useRef, useState } from "react";
import { Bot } from "lucide-react";

import { sendChatMessage } from "../../api/chatApi";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ThinkingIndicator from "./ThinkingIndicator";


export default function ChatPanel({
  conversationId,
  onEnsureConversation,
  messages: initialMessages,
  setMessages: setParentMessages,
  onReportUpdate,
  theme = "light",
}) {
  const [messages, setMessages] = useState(
    initialMessages || []
  );

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);


  // =========================================================
  // Sync messages with parent
  // =========================================================

  useEffect(() => {
    setMessages(initialMessages || []);
  }, [initialMessages]);


  // =========================================================
  // Auto scroll
  // =========================================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);


  // =========================================================
  // Update messages
  // =========================================================

  function updateMessages(updater) {
    setMessages((prev) => {
      const next =
        typeof updater === "function"
          ? updater(prev)
          : updater;

      if (setParentMessages) {
        setParentMessages(next);
      }

      return next;
    });
  }


  // =========================================================
  // Send message
  // =========================================================

  async function handleSend() {
    const userMessage = input.trim();

    if (!userMessage || loading) {
      return;
    }

    setInput("");
    setLoading(true);


    // =======================================================
    // Add user message immediately
    // =======================================================

    const userMessageObject = {
      id: `user-${Date.now()}`,
      role: "user",
      message: userMessage,
    };

    updateMessages((prev) => [
      ...prev,
      userMessageObject,
    ]);


    // =======================================================
    // Ensure conversation
    // =======================================================

    let targetConversationId =
      conversationId;

    if (
      !targetConversationId &&
      onEnsureConversation
    ) {
      try {
        targetConversationId =
          await onEnsureConversation();

      } catch (error) {
        console.error(
          "Create chat error:",
          error
        );
      }
    }


    // =======================================================
    // Conversation creation failed
    // =======================================================

    if (!targetConversationId) {
      updateMessages((prev) =>
        prev.filter(
          (message) =>
            message.id !==
            userMessageObject.id
        )
      );

      setInput(userMessage);
      setLoading(false);

      return;
    }


    // =======================================================
    // Call backend
    // =======================================================

    try {
      const data =
        await sendChatMessage(
          targetConversationId,
          userMessage
        );


      // =====================================================
      // Intelligence Output
      //
      // IMPORTANT:
      // - summary = short Gemini summary
      // - response = full Gemini response for Chat
      // - trend_data = videos
      // =====================================================

      if (
        onReportUpdate &&
        Array.isArray(data.trend_data)
      ) {
        const sortedVideos = [
          ...data.trend_data,
        ].sort(
          (a, b) =>
            (a.rank || 0) -
            (b.rank || 0)
        );

        onReportUpdate({
          summary:
            data.summary || "",
          videos: sortedVideos,
        });
      }


      // =====================================================
      // Add full assistant response to Chat
      // =====================================================

      updateMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          message: data.response || "",
        },
      ]);

    } catch (error) {
      console.error(
        "Chat API error:",
        error
      );


      // =====================================================
      // Error message
      // =====================================================

      updateMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          message:
            "Sorry, I couldn't connect to the agent.",
        },
      ]);

    } finally {
      setLoading(false);
    }
  }


  // =========================================================
  // Render
  // =========================================================

  return (
    <section className="flex h-full min-h-0 flex-col">


      {/* =====================================================
          Header
          ===================================================== */}

      <div
        className={`border-b px-5 py-4 ${
          theme === "dark"
            ? "border-slate-800"
            : "border-slate-200"
        }`}
      >
        <div className="flex items-center gap-3">


          {/* Bot Icon */}

          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              theme === "dark"
                ? "bg-slate-800"
                : "bg-slate-100"
            }`}
          >
            <Bot size={18} />
          </div>


          {/* Title */}

          <div>
            <h2
              className={`text-sm font-semibold ${
                theme === "dark"
                  ? "text-slate-100"
                  : "text-slate-900"
              }`}
            >
              AI Agent
            </h2>

            <p
              className={`text-xs ${
                theme === "dark"
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Ask about trends and marketing
            </p>
          </div>

        </div>
      </div>


      {/* =====================================================
          Messages
          ===================================================== */}

      <div className="flex-1 space-y-4 overflow-y-auto p-5">

        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            message={
              message.message ||
              message.content
            }
            theme={theme}
          />
        ))}


        {/* Thinking */}

        {loading && (
          <ThinkingIndicator
            variant="ring"
            theme={theme}
          />
        )}


        {/* Scroll anchor */}

        <div ref={messagesEndRef} />

      </div>


      {/* =====================================================
          Input
          ===================================================== */}

      <div
        className={`border-t p-4 ${
          theme === "dark"
            ? "border-slate-800"
            : "border-slate-200"
        }`}
      >
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