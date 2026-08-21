import { useEffect, useState } from "react";

import ConversationList from "../components/chat/ConversationList";
import ChatPanel from "../components/chat/ChatPanel";
import ReportPanel from "../components/reports/ReportPanel";

import {
  createConversation,
  getConversations,
  getConversation,
  updateConversation,
} from "../api/conversationApi";


export default function ChatPage({
  theme = "light",
  authUser,
}) {
  const [conversations, setConversations] =
    useState([]);

  const [activeConversationId, setActiveConversationId] =
    useState(null);

  const [messages, setMessages] =
    useState([]);

  const [videos, setVideos] =
    useState([]);


  // =========================================================
  // Load conversations when authenticated user changes
  // =========================================================

  useEffect(() => {
    if (!authUser?.id) {
      setConversations([]);
      setActiveConversationId(null);
      setMessages([]);
      setVideos([]);

      return;
    }

    loadConversations(authUser.id);
  }, [authUser?.id]);


  // =========================================================
  // Load user's conversations
  // =========================================================

  async function loadConversations(userId) {
    try {
      const data =
        await getConversations(userId);

      // Only keep conversations belonging
      // to the authenticated user.
      const userConversations =
        data.filter(
          (conversation) =>
            conversation.user_id === userId
        );

      setConversations(
        userConversations
      );

      if (userConversations.length > 0) {
        await selectConversation(
          userConversations[0].id,
          userId
        );
      } else {
        await handleNewChat(userId);
      }

    } catch (error) {
      console.error(
        "Load conversations error:",
        error
      );

      setConversations([]);
      setActiveConversationId(null);
      setMessages([]);
      setVideos([]);
    }
  }


  // =========================================================
  // Create new conversation
  // =========================================================

  async function handleNewChat(
    userId = authUser?.id
  ) {
    if (!userId) {
      console.error(
        "Cannot create conversation: user not found"
      );

      return null;
    }

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


  // =========================================================
  // Select conversation
  // =========================================================

  async function selectConversation(
    conversationId,
    userId = authUser?.id
  ) {
    if (!userId || !conversationId) {
      return;
    }

    try {
      const conversation =
        await getConversation(
          conversationId,
          userId
        );

      // Extra frontend ownership check.
      if (
        conversation.user_id !== userId
      ) {
        console.error(
          "Conversation does not belong to current user"
        );

        return;
      }

      setActiveConversationId(
        conversation.id
      );

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


  // =========================================================
  // Rename conversation
  // =========================================================

  async function handleRenameConversation(
    conversationId,
    newTitle
  ) {
    const userId = authUser?.id;

    if (!userId) {
      throw new Error(
        "Authenticated user not found"
      );
    }

    if (!conversationId) {
      throw new Error(
        "Conversation ID is required"
      );
    }

    const title =
      newTitle.trim();

    if (!title) {
      throw new Error(
        "Conversation title cannot be empty"
      );
    }


    // Make sure this conversation
    // belongs to the current user's list.
    const conversation =
      conversations.find(
        (item) =>
          item.id === conversationId
      );

    if (!conversation) {
      throw new Error(
        "Conversation does not belong to current user"
      );
    }


    // Backend performs the final
    // ownership validation.
    const updatedConversation =
      await updateConversation(
        conversationId,
        userId,
        title
      );


    // Update ONLY the matching conversation.
    setConversations((prev) =>
      prev.map((item) =>
        item.id === conversationId
          ? {
              ...item,
              ...updatedConversation,
            }
          : item
      )
    );
  }


  // =========================================================
  // Render
  // =========================================================

  return (
    <div className="flex h-full min-h-0">

      {/* =====================================================
          Conversation List
          ===================================================== */}

      <aside className="w-64 shrink-0 border-r border-slate-200 dark:border-slate-800">

        <ConversationList
          conversations={conversations}
          activeConversationId={
            activeConversationId
          }
          onNewChat={handleNewChat}
          onSelect={selectConversation}
          onRename={
            handleRenameConversation
          }
          theme={theme}
        />

      </aside>


      {/* =====================================================
          Chat
          ===================================================== */}

      <main className="min-w-0 flex-1">

        <ChatPanel
          conversationId={
            activeConversationId
          }
          onEnsureConversation={
            handleNewChat
          }
          messages={messages}
          setMessages={setMessages}
          onVideosUpdate={setVideos}
          theme={theme}
        />

      </main>


      {/* =====================================================
          Intelligence Report
          ===================================================== */}

      <aside className="w-[42%] min-w-0 border-l border-slate-200 dark:border-slate-800">

        <ReportPanel
          videos={videos}
          theme={theme}
        />

      </aside>

    </div>
  );
}