import {
  MoreVertical,
  Plus,
  MessageSquare,
  Sparkles,
  Pencil,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";


export default function ConversationList({
  conversations,
  activeConversationId,
  onNewChat,
  onSelect,
  onRename,
  theme = "light",
}) {
  const [openMenuId, setOpenMenuId] =
    useState(null);

  const [editingId, setEditingId] =
    useState(null);

  const [editingTitle, setEditingTitle] =
    useState("");

  const [savingRename, setSavingRename] =
    useState(false);

  const menuRef = useRef(null);

  // Prevent Enter + blur from
  // sending the rename request twice.
  const submittingRef = useRef(false);


  // =========================================================
  // Close menu when clicking outside
  // =========================================================

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target
        )
      ) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);


  // =========================================================
  // Start rename
  // =========================================================

  function startRename(conversation) {
    setEditingId(conversation.id);
    setEditingTitle(conversation.title);
    setOpenMenuId(null);
    setSavingRename(false);
    submittingRef.current = false;
  }


  // =========================================================
  // Cancel rename
  // =========================================================

  function cancelRename() {
    setEditingId(null);
    setEditingTitle("");
    setSavingRename(false);
    submittingRef.current = false;
  }


  // =========================================================
  // Submit rename
  // =========================================================

  async function submitRename(conversation) {
    // Prevent duplicate API requests.
    if (submittingRef.current) {
      return;
    }

    const title =
      editingTitle.trim();

    // Empty title -> cancel.
    if (!title) {
      cancelRename();
      return;
    }

    // Nothing changed -> just exit edit mode.
    if (
      title === conversation.title
    ) {
      cancelRename();
      return;
    }

    submittingRef.current = true;
    setSavingRename(true);

    try {
      // =====================================================
      // API request
      //
      // conversation.id
      // + authenticated user id
      // are handled by ChatPage -> backend.
      // =====================================================

      await onRename(
        conversation.id,
        title
      );

      // API succeeded.
      cancelRename();

    } catch (error) {
      console.error(
        "Rename conversation error:",
        error
      );

      // IMPORTANT:
      // Keep input open when API fails.
      setSavingRename(false);
      submittingRef.current = false;
    }
  }


  // =========================================================
  // Keyboard handling
  // =========================================================

  function handleRenameKeyDown(
    event,
    conversation
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();

      submitRename(conversation);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();

      cancelRename();
    }
  }


  // =========================================================
  // Render
  // =========================================================

  return (
    <div
      className={`flex h-full min-h-0 flex-col p-4 ${
        theme === "dark"
          ? "bg-slate-950"
          : "bg-slate-50"
      }`}
    >

      {/* =====================================================
          New Chat
          ===================================================== */}

      <button
        onClick={onNewChat}
        className={`group mb-4 flex items-center justify-between rounded-2xl border px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
          theme === "dark"
            ? "border-slate-800 bg-slate-900 text-slate-100 hover:border-slate-700"
            : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
        }`}
      >
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
            <Plus size={18} />
          </div>

          <div>
            <p className="text-sm font-semibold">
              New Chat
            </p>

            <p
              className={`text-xs ${
                theme === "dark"
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Start a fresh thread
            </p>
          </div>

        </div>

        <Sparkles
          size={16}
          className={
            theme === "dark"
              ? "text-slate-500"
              : "text-slate-400"
          }
        />
      </button>


      {/* =====================================================
          Header
          ===================================================== */}

      <div className="mb-2 flex items-center justify-between px-1">

        <p
          className={`text-xs font-semibold uppercase tracking-[0.18em] ${
            theme === "dark"
              ? "text-slate-500"
              : "text-slate-400"
          }`}
        >
          Recent Chats
        </p>

        <span
          className={`text-[11px] ${
            theme === "dark"
              ? "text-slate-500"
              : "text-slate-400"
          }`}
        >
          {conversations.length}
        </span>

      </div>


      {/* =====================================================
          Conversations
          ===================================================== */}

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">

        {conversations.length === 0 ? (

          <div
            className={`rounded-2xl border border-dashed px-4 py-6 text-center text-sm ${
              theme === "dark"
                ? "border-slate-800 text-slate-500"
                : "border-slate-200 text-slate-500"
            }`}
          >
            No saved chats yet
          </div>

        ) : (

          conversations.map(
            (conversation) => {

              const active =
                conversation.id ===
                activeConversationId;

              const editing =
                editingId ===
                conversation.id;

              const menuOpen =
                openMenuId ===
                conversation.id;


              return (
                <div
                  key={conversation.id}
                  className="relative"
                >

                  {/* =================================================
                      Conversation
                      ================================================= */}

                  <button
                    type="button"
                    onClick={() => {
                      if (!editing) {
                        onSelect(
                          conversation.id
                        );
                      }
                    }}
                    className={`w-full rounded-2xl border px-4 py-3 pr-11 text-left transition ${
                      active
                        ? "border-cyan-500/40 bg-cyan-500/10 shadow-sm"
                        : theme === "dark"
                          ? "border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >

                    <div className="flex items-start gap-3">

                      {/* Icon */}

                      <div
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                          active
                            ? "bg-cyan-500 text-white"
                            : theme === "dark"
                              ? "bg-slate-800 text-slate-300"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <MessageSquare
                          size={15}
                        />
                      </div>


                      {/* Title */}

                      <div className="min-w-0 flex-1">

                        {editing ? (

                          <input
                            autoFocus
                            type="text"
                            value={
                              editingTitle
                            }
                            disabled={
                              savingRename
                            }
                            onChange={(
                              event
                            ) =>
                              setEditingTitle(
                                event.target.value
                              )
                            }
                            onKeyDown={(
                              event
                            ) =>
                              handleRenameKeyDown(
                                event,
                                conversation
                              )
                            }
                            onBlur={() =>
                              submitRename(
                                conversation
                              )
                            }
                            onClick={(
                              event
                            ) =>
                              event.stopPropagation()
                            }
                            className={`w-full rounded-lg border px-2 py-1 text-sm font-semibold outline-none ${
                              theme === "dark"
                                ? "border-slate-700 bg-slate-800 text-slate-100 focus:border-cyan-500"
                                : "border-slate-300 bg-white text-slate-900 focus:border-cyan-500"
                            }`}
                          />

                        ) : (

                          <p
                            className={`truncate text-sm font-semibold ${
                              active
                                ? "text-cyan-200"
                                : theme === "dark"
                                  ? "text-slate-100"
                                  : "text-slate-900"
                            }`}
                          >
                            {
                              conversation.title
                            }
                          </p>

                        )}


                        {!editing && (
                          <p
                            className={`mt-1 text-xs ${
                              theme === "dark"
                                ? "text-slate-400"
                                : "text-slate-500"
                            }`}
                          >
                            Tap to reopen
                          </p>
                        )}

                      </div>

                    </div>

                  </button>


                  {/* =================================================
                      Three dots
                      ================================================= */}

                  {!editing && (
                    <button
                      type="button"
                      onClick={(
                        event
                      ) => {
                        event.stopPropagation();

                        setOpenMenuId(
                          menuOpen
                            ? null
                            : conversation.id
                        );
                      }}
                      className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg transition ${
                        theme === "dark"
                          ? "text-slate-500 hover:bg-slate-800 hover:text-slate-200"
                          : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      }`}
                      aria-label="Conversation options"
                    >
                      <MoreVertical
                        size={17}
                      />
                    </button>
                  )}


                  {/* =================================================
                      Menu
                      ================================================= */}

                  {menuOpen && (
                    <div
                      ref={menuRef}
                      className={`absolute right-2 top-11 z-50 w-36 overflow-hidden rounded-xl border shadow-xl ${
                        theme === "dark"
                          ? "border-slate-700 bg-slate-900"
                          : "border-slate-200 bg-white"
                      }`}
                    >

                      <button
                        type="button"
                        onClick={() =>
                          startRename(
                            conversation
                          )
                        }
                        className={`flex w-full items-center gap-2 px-3 py-2.5 text-sm transition ${
                          theme === "dark"
                            ? "text-slate-200 hover:bg-slate-800"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <Pencil
                          size={14}
                        />

                        Rename
                      </button>

                    </div>
                  )}

                </div>
              );
            }
          )

        )}

      </div>

    </div>
  );
}