import { Send } from "lucide-react";

export default function ChatInput({
  value,
  onChange,
  onSend,
  loading,
  theme = "light",
}) {
  function handleSubmit(event) {
    event.preventDefault();

    if (!value.trim() || loading) {
      return;
    }

    onSend();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 rounded-2xl border p-2.5 shadow-sm ${theme === "dark" ? "border-slate-700 bg-slate-900" : "border-slate-300 bg-white"}`}
    >
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={loading}
        type="text"
        placeholder="Ask anything..."
        className={`flex-1 bg-transparent px-3 py-2 text-sm outline-none ${theme === "dark" ? "text-slate-50 placeholder:text-slate-400" : "text-slate-900 placeholder:text-slate-400"}`}
      />

      <button
        type="submit"
        disabled={loading || !value.trim()}
        className={`flex h-10 w-10 items-center justify-center rounded-xl text-white transition disabled:cursor-not-allowed disabled:opacity-40 ${theme === "dark" ? "bg-cyan-500 hover:bg-cyan-400" : "bg-slate-900 hover:bg-slate-700"}`}
      >
        <Send size={16} />
      </button>
    </form>
  );
}
