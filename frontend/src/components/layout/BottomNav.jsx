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

export default function BottomNav() {
  return (
    <nav className="h-16 border-t border-slate-200 bg-white">
      <div className="flex h-full items-center justify-center gap-12">

        {items.map((item, index) => {

          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-1 text-xs ${
                index === 0
                  ? "font-medium text-slate-900"
                  : "text-slate-400"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}

      </div>
    </nav>
  );
}
