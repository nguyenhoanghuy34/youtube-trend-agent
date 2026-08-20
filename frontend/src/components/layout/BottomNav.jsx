import {
  Bot,
  TrendingUp,
  BarChart3,
  Lightbulb,
} from "lucide-react";

const items = [
  {
    label: "Agent",
    icon: Bot,
  },
  {
    label: "Trends",
    icon: TrendingUp,
  },
  {
    label: "Reports",
    icon: BarChart3,
  },
  {
    label: "Insights",
    icon: Lightbulb,
  },
];

export default function BottomNav({ theme }) {
  const isDark = theme === "dark";

  return (
    <nav
      className={`h-16 border-t ${
        isDark
          ? "border-slate-800 bg-slate-950"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="relative flex h-full items-center justify-center">

        {/* Navigation */}
        <div className="flex items-center gap-12">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`flex flex-col items-center gap-1 text-xs transition ${
                  index === 0
                    ? isDark
                      ? "font-medium text-white"
                      : "font-medium text-slate-900"
                    : isDark
                      ? "text-slate-400 hover:text-slate-200"
                      : "text-slate-400 hover:text-slate-700"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

{/* Demo Notice */}
<div
  className={`absolute right-5 top-1/2 -translate-y-1/2 text-xs font-medium ${
    isDark ? "text-slate-500" : "text-slate-500"
  }`}
>
  Demo product · For non-commercial purposes
</div>

      </div>
    </nav>
  );
}