import { BarChart3 } from "lucide-react";

export default function ReportPanel() {
  return (
    <section className="flex h-full flex-col">

      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
            <BarChart3 size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Reports
            </h2>

            <p className="text-xs text-slate-500">
              Intelligence output
            </p>
          </div>

        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">

        <div className="text-center">

          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <BarChart3
              size={22}
              className="text-slate-400"
            />
          </div>

          <h3 className="text-sm font-medium text-slate-700">
            Reports coming soon
          </h3>

          <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
            Trend reports and marketing insights
            will appear here.
          </p>

        </div>

      </div>

    </section>
  );
}
