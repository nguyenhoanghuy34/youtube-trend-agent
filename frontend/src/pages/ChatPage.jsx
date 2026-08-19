import { useEffect, useState } from "react";

import ConversationList from "../components/chat/ConversationList";
import ChatPanel from "../components/chat/ChatPanel";
import ReportPanel from "../components/reports/ReportPanel";

import {
  createConversation,
  getConversations,
  getConversation,
} from "../api/conversationApi";


export default function ChatPage({ theme = "light", authUser }) {
  const [conversations, setConversations] =
    useState([]);

  const [activeConversationId, setActiveConversationId] =
    useState(null);

  const [messages, setMessages] =
    useState([]);

  const [videos, setVideos] =
    useState([]);


  useEffect(() => {
    if (authUser?.id) {
      loadConversations(authUser.id);
    }
  }, [authUser?.id]);


  async function loadConversations(userId) {
    try {
      const data = await getConversations(userId);

      setConversations(data);

      if (data.length > 0) {
        await selectConversation(data[0].id, userId);
      } else {
        await handleNewChat(userId);
      }

    } catch (error) {
      console.error(
        "Load conversations error:",
        error
      );
    }
  }


  async function handleNewChat(userId = authUser?.id) {
    try {
      const conversation =
        await createConversation(userId);

      setConversations((prev) => [
        conversation,
        ...prev,
      ]);

      setActiveConversationId(
        conversation.id
      );

      setMessages([]);
      setVideos([]);

      return conversation.id;

    } catch (error) {
      console.error(
        "Create conversation error:",
        error
      );

      return null;
    }
  }


  async function selectConversation(id, userId = authUser?.id) {
    try {
      const conversation =
        await getConversation(id, userId);

      setActiveConversationId(id);

      setMessages(
        conversation.messages || []
      );

      setVideos([]);

    } catch (error) {
      console.error(
        "Get conversation error:",
        error
      );
    }
  }


  return (
    <div className="flex h-full min-h-0">

      {/* Conversation list */}
      <aside className="w-64 shrink-0 border-r border-slate-200 dark:border-slate-800">

        <ConversationList
          conversations={conversations}
          activeConversationId={
            activeConversationId
          }
          onNewChat={handleNewChat}
          onSelect={selectConversation}
          theme={theme}
        />

      </aside>


      {/* Chat */}
      <main className="min-w-0 flex-1">

        <ChatPanel
          conversationId={
            activeConversationId
          }
          onEnsureConversation={handleNewChat}
          messages={messages}
          setMessages={setMessages}
          onVideosUpdate={setVideos}
          theme={theme}
        />

      </main>


      {/* Intelligence Report */}
      <aside className="w-[42%] min-w-0 border-l border-slate-200 dark:border-slate-800">

        <ReportPanel
          videos={videos}
          theme={theme}
        />

      </aside>

    </div>
  );
}
