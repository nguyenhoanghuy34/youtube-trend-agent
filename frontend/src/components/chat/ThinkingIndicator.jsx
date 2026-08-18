export default function ThinkingIndicator({ variant = "shimmer" }) {
  if (variant === "shimmer") {
    return (
      <div className="flex items-center gap-2 py-2">
        <div className="relative overflow-hidden text-sm font-medium text-slate-500">
          <span>Agent is thinking...</span>

          <span
            className="
              absolute inset-0
              translate-x-[-100%]
              animate-[shimmer_1.8s_infinite]
              bg-gradient-to-r
              from-transparent
              via-white/80
              to-transparent
            "
          />
        </div>
      </div>
    );
  }

  if (variant === "neural") {
    return (
      <div className="flex items-center gap-3 py-2">
        <div className="relative h-8 w-12">
          {/* Connections */}
          <div className="absolute left-2 top-3 h-px w-8 bg-slate-300" />
          <div className="absolute left-5 top-1 h-6 w-px rotate-[35deg] bg-slate-300" />
          <div className="absolute left-5 top-1 h-6 w-px -rotate-[35deg] bg-slate-300" />

          {/* Nodes */}
          <span className="absolute left-0 top-2 h-2 w-2 animate-pulse rounded-full bg-slate-400" />
          <span className="absolute left-5 top-0 h-2 w-2 animate-pulse rounded-full bg-slate-500 [animation-delay:200ms]" />
          <span className="absolute left-5 top-6 h-2 w-2 animate-pulse rounded-full bg-slate-500 [animation-delay:400ms]" />
          <span className="absolute right-0 top-2 h-2 w-2 animate-pulse rounded-full bg-slate-400 [animation-delay:600ms]" />
        </div>

        <span className="text-sm text-slate-500">
          Processing intelligence...
        </span>
      </div>
    );
  }

  if (variant === "ring") {
    return (
      <div className="flex items-center gap-3 py-2">
        <div className="relative flex h-8 w-8 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700" />

          <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        </div>

        <span className="text-sm text-slate-500">
          Analyzing trends...
        </span>
      </div>
    );
  }

  return null;
}