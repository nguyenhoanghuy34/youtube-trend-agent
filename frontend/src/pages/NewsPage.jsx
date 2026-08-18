export default function NewsPage({ theme = "light" }) {
  return (
    <div className={`h-full overflow-auto p-6 ${theme === "dark" ? "bg-slate-950" : "bg-white"}`}>
      <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>News</h1>
      <p className={`mt-2 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
        YouTube intelligence news will appear here.
      </p>
    </div>
  );
}
