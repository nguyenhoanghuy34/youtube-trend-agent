import { Bot, Send } from "lucide-react";

export default function ChatPanel() {
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
              Ask about YouTube trends
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5">

        <div className="max-w-md rounded-2xl bg-slate-100 px-4 py-3">
          <p className="text-sm leading-6 text-slate-700">
            Hi! I’m your Trend Intelligence Agent.
            Ask me about YouTube trends, topics,
            competitors, or content ideas.
          </p>
        </div>

      </div>

      {/* Input */}
      <div className="border-t border-slate-200 p-4">

        <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white p-2">

          <input
            type="text"
            placeholder="Ask anything..."
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400"
          />

          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white transition hover:bg-slate-700"
          >
            <Send size={16} />
          </button>

        </div>

      </div>

    </section>
  );
}
