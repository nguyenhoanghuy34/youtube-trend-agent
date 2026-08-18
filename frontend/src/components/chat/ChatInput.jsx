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
      className={`flex items-center gap-2 rounded-xl border p-2 ${theme === "dark" ? "border-slate-700 bg-slate-900" : "border-slate-300 bg-white"}`}
    >
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={loading}
        type="text"
        placeholder="Ask anything..."
        className={`flex-1 bg-transparent px-3 py-2 text-sm outline-none ${theme === "dark" ? "text-slate-100 placeholder:text-slate-500" : "text-slate-900 placeholder:text-slate-400"}`}
      />

      <button
        type="submit"
        disabled={loading || !value.trim()}
        className={`flex h-9 w-9 items-center justify-center rounded-lg text-white disabled:cursor-not-allowed disabled:opacity-40 ${theme === "dark" ? "bg-slate-700" : "bg-slate-900"}`}
      >
        <Send size={16} />
      </button>
    </form>
  );
}
