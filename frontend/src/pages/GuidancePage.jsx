export default function Guidance({ theme = "light" }) {
  return (
    <div className={`flex h-full items-center justify-center ${theme === "dark" ? "bg-slate-950" : "bg-white"}`}>
      <div className="text-center">
        <h1 className={`text-2xl font-semibold ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>
          Guidance
        </h1>

        <p className={`mt-2 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
          Guidance and usage instructions are under development.
        </p>
      </div>
    </div>
  );
}
