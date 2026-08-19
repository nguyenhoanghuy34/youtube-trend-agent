import { Plus, MessageSquare, Sparkles } from "lucide-react";

export default function ConversationList({
  conversations,
  activeConversationId,
  onNewChat,
  onSelect,
  theme = "light",
}) {
  return (
    <div
      className={`flex h-full min-h-0 flex-col p-4 ${
        theme === "dark" ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
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
            <p className="text-sm font-semibold">New Chat</p>
            <p
              className={`text-xs ${
                theme === "dark" ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Start a fresh thread
            </p>
          </div>
        </div>

        <Sparkles
          size={16}
          className={
            theme === "dark" ? "text-slate-500" : "text-slate-400"
          }
        />
      </button>

      <div className="mb-2 flex items-center justify-between px-1">
        <p
          className={`text-xs font-semibold uppercase tracking-[0.18em] ${
            theme === "dark" ? "text-slate-500" : "text-slate-400"
          }`}
        >
          Recent Chats
        </p>
        <span
          className={`text-[11px] ${
            theme === "dark" ? "text-slate-500" : "text-slate-400"
          }`}
        >
          {conversations.length}
        </span>
      </div>

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
          conversations.map((conversation) => {
            const active =
              conversation.id === activeConversationId;

            return (
              <button
                key={conversation.id}
                onClick={() => onSelect(conversation.id)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                  active
                    ? "border-cyan-500/40 bg-cyan-500/10 shadow-sm"
                    : theme === "dark"
                      ? "border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                      active
                        ? "bg-cyan-500 text-white"
                        : theme === "dark"
                          ? "bg-slate-800 text-slate-300"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <MessageSquare size={15} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-semibold ${
                        active
                          ? "text-cyan-200"
                          : theme === "dark"
                            ? "text-slate-100"
                            : "text-slate-900"
                      }`}
                    >
                      {conversation.title}
                    </p>
                    <p
                      className={`mt-1 text-xs ${
                        theme === "dark"
                          ? "text-slate-400"
                          : "text-slate-500"
                      }`}
                    >
                      Tap to reopen
                    </p>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
