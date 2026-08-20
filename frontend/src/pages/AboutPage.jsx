import {
  Bot,
  Newspaper,
  BarChart3,
  TrendingUp,
  Search,
  BrainCircuit,
  Zap,
  Play,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "YouTube AI Agents",
    description:
      "AI-powered agents designed to understand YouTube data, discover trends and help users interact with YouTube intelligence through natural language.",
    tag: "AI AGENT",
  },
  {
    icon: Newspaper,
    title: "YouTube Intelligence",
    description:
      "Stay updated with important information from YouTube, including technology, AI, education, scholarships and trending topics.",
    tag: "INTELLIGENCE",
  },
  {
    icon: BarChart3,
    title: "Smart Channel Analytics",
    description:
      "Analyze YouTube channels, understand content performance and discover patterns that can support better content decisions.",
    tag: "ANALYTICS",
  },
  {
    icon: TrendingUp,
    title: "Trend Discovery",
    description:
      "Identify hot topics, rising trends and emerging conversations before they become mainstream.",
    tag: "TREND",
  },
];

const capabilities = [
  {
    icon: Search,
    title: "Discover",
    text: "Find what is trending across YouTube.",
  },
  {
    icon: BrainCircuit,
    title: "Analyze",
    text: "Turn YouTube data into meaningful intelligence.",
  },
  {
    icon: Zap,
    title: "Understand",
    text: "Use AI to understand topics, channels and audiences.",
  },
];

export default function AboutPage({ theme = "dark" }) {
  const isDark = theme === "dark";

  return (
    <main
      className={`h-full overflow-y-auto ${
        isDark ? "text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-12">
        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/45 px-7 py-16 text-center backdrop-blur-xl lg:px-20 lg:py-20">
          {/* Background glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

          <div className="relative mx-auto max-w-4xl">
            {/* Logo */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 shadow-lg shadow-red-950/20">
<Play size={30} fill="currentColor" className="ml-1 text-red-500" />
            </div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300">
              <Sparkles size={13} />
              YouTube Intelligence Platform
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              YouTube Trend Agent
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Intelligence for the YouTube ecosystem. Discover trends,
              understand content and turn YouTube data into actionable
              insights with AI.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
                AI Powered
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
                Trend Intelligence
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
                Smart Analytics
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            WHAT WE PROVIDE
        ====================================================== */}
        <section className="mt-14">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              What we provide
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              Intelligence built around YouTube
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              YTA combines YouTube data, AI agents and analytical systems to
              help users discover and understand the rapidly changing
              YouTube ecosystem.
            </p>
          </div>

          {/* Service cards */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="group rounded-2xl border border-white/10 bg-slate-900/45 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                      <Icon size={21} className="text-blue-400" />
                    </div>

                    <span className="text-[9px] font-semibold tracking-widest text-slate-600">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {service.description}
                  </p>

                  <div className="mt-5 flex items-center gap-1 text-xs font-medium text-blue-400 opacity-0 transition group-hover:opacity-100">
                    Explore
                    <ArrowRight size={13} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            NEWS / INFORMATION
        ====================================================== */}
        <section className="mt-14">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/[0.08] to-purple-500/[0.06] p-7 backdrop-blur-xl lg:p-10">
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                  <Newspaper size={21} className="text-blue-400" />
                </div>

                <h2 className="text-2xl font-bold text-white lg:text-3xl">
                  Stay informed about what matters
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                  YTA provides curated information from the YouTube ecosystem
                  across technology, artificial intelligence, education,
                  scholarships and emerging trends.
                </p>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                  Instead of searching through thousands of videos, users can
                  quickly discover the topics and information that matter to
                  them.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                  <p className="text-2xl font-bold text-white">AI</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Technology & Research
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                  <p className="text-2xl font-bold text-white">EDU</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Courses & Learning
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                  <p className="text-2xl font-bold text-white">UNI</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Universities
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                  <p className="text-2xl font-bold text-white">🔥</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Hot Trends
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}
        <section className="mt-14">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
              Our approach
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              From YouTube data to intelligence
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {capabilities.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="relative rounded-2xl border border-white/10 bg-slate-900/40 p-7 text-center backdrop-blur-xl"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-purple-400/20 bg-purple-500/10">
                    <Icon size={21} className="text-purple-400" />
                  </div>

                  <div className="mt-5 text-xs font-semibold text-slate-600">
                    0{index + 1}
                  </div>

                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.text}
                  </p>

                  {index < capabilities.length - 1 && (
                    <ArrowRight
                      size={18}
                      className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-slate-700 md:block"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            FOOTER CTA
        ====================================================== */}
        <section className="py-16 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold text-white">
              Understand YouTube. Smarter.
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              YTA brings YouTube trends, information and AI-powered analysis
              together in one intelligent platform.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/10 px-5 py-2.5 text-sm font-medium text-blue-300">
              <Bot size={16} />
              Powered by YouTube Intelligence
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}