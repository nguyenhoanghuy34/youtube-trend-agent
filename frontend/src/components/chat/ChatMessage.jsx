export default function ChatMessage({ message, role, theme = "light" }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
          isUser
            ? theme === "dark"
              ? "bg-slate-200 text-slate-950"
              : "bg-slate-900 text-white"
            : theme === "dark"
              ? "bg-slate-800 text-slate-100"
              : "bg-slate-100 text-slate-700"
        }`}
      >
        <div className="whitespace-pre-line">
          {message}
        </div>
      </div>
    </div>
  );
}
