import { Send } from "lucide-react";

export default function ChatInput({
  value,
  onChange,
  onSend,
  loading,
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
      className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white p-2"
    >
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={loading}
        type="text"
        placeholder="Ask anything..."
        className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400"
      />

      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Send size={16} />
      </button>
    </form>
  );
}