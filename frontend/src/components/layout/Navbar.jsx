import { Activity } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-6">
        
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Activity size={19} />
          </div>

          <div>
            <h1 className="text-sm font-semibold text-slate-900">
              Trend Intelligence
            </h1>

            <p className="text-xs text-slate-500">
              AI Marketing Agent
            </p>
          </div>
        </div>

        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
          Demo
        </div>

      </div>
    </header>
  );
}
