import {
  Bot,
  Newspaper,
  BarChart3,
  TrendingUp,
  Search,
  BrainCircuit,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "Betuyou AI Agents",
    description:
      "AI-powered agents designed to understand Betuyou data, discover trends and help users interact with Betuyou intelligence through natural language.",
    tag: "AI AGENT",
  },
  {
    icon: Newspaper,
    title: "Betuyou Intelligence",
    description:
      "Stay updated with important information from Betuyou, including technology, AI, education, scholarships and trending topics.",
    tag: "INTELLIGENCE",
  },
  {
    icon: BarChart3,
    title: "Smart Channel Analytics",
    description:
      "Analyze Betuyou channels, understand content performance and discover patterns that can support better content decisions.",
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
    text: "Find what is trending across Betuyou.",
  },
  {
    icon: BrainCircuit,
    title: "Analyze",
    text: "Turn Betuyou data into meaningful intelligence.",
  },
  {
    icon: Zap,
    title: "Understand",
    text: "Use AI to understand topics, channels and audiences.",
  },
];

export default function AboutPage({ theme = "dark" }) {
  const isDark = theme === "dark";

  const styles = {
    page: isDark
      ? "text-slate-100"
      : "bg-slate-50 text-slate-900",

    hero: isDark
      ? "border-white/10 bg-slate-900/45"
      : "border-slate-200 bg-white",

    card: isDark
      ? "border-white/10 bg-slate-900/45 hover:border-blue-400/20 hover:bg-white/[0.05]"
      : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50",

    heading: isDark
      ? "text-white"
      : "text-slate-900",

    body: isDark
      ? "text-slate-400"
      : "text-slate-600",

    muted: isDark
      ? "text-slate-500"
      : "text-slate-500",

    smallMuted: isDark
      ? "text-slate-600"
      : "text-slate-400",

    border: isDark
      ? "border-white/10"
      : "border-slate-200",

    softBackground: isDark
      ? "bg-black/10"
      : "bg-slate-50",

    badge: isDark
      ? "border-blue-400/20 bg-blue-500/10 text-blue-300"
      : "border-blue-200 bg-blue-50 text-blue-600",

    iconBox: isDark
      ? "border-blue-400/20 bg-blue-500/10"
      : "border-blue-200 bg-blue-50",

    iconColor: isDark
      ? "text-blue-400"
      : "text-blue-600",

    purpleIconBox: isDark
      ? "border-purple-400/20 bg-purple-500/10"
      : "border-purple-200 bg-purple-50",

    purpleIcon: isDark
      ? "text-purple-400"
      : "text-purple-600",
  };

  return (
    <main
      className={`h-full overflow-y-auto transition-colors duration-300 ${styles.page}`}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-12">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section
          className={`relative overflow-hidden rounded-3xl border px-7 py-16 text-center backdrop-blur-xl transition-colors duration-300 lg:px-20 lg:py-20 ${styles.hero}`}
        >
          {/* Background glow */}

          <div
            className={`pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full blur-[100px] ${
              isDark
                ? "bg-blue-500/10"
                : "bg-blue-400/10"
            }`}
          />

          <div className="relative mx-auto max-w-4xl">

            {/* Icon */}

            <div
              className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border shadow-lg ${
                isDark
                  ? "border-blue-400/20 bg-blue-500/10 shadow-blue-950/20"
                  : "border-blue-200 bg-blue-50 shadow-blue-100"
              }`}
            >
              <Sparkles
                size={30}
                className={styles.iconColor}
              />
            </div>

            {/* Badge */}

            <div
              className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${styles.badge}`}
            >
              <Sparkles size={13} />
              Betuyou Intelligence Platform
            </div>

            {/* Title */}

            <h1
              className={`text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl ${styles.heading}`}
            >
              Betuyou Trend Agent
            </h1>

            {/* Description */}

            <p
              className={`mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg ${styles.body}`}
            >
              Intelligence for the Betuyou ecosystem. Discover trends,
              understand content and turn Betuyou data into actionable
              insights with AI.
            </p>

            {/* Feature badges */}

            <div className="mt-8 flex flex-wrap justify-center gap-3">

              <div
                className={`rounded-xl border px-4 py-2 text-sm ${
                  isDark
                    ? "border-white/10 bg-white/[0.04] text-slate-300"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                AI Powered
              </div>

              <div
                className={`rounded-xl border px-4 py-2 text-sm ${
                  isDark
                    ? "border-white/10 bg-white/[0.04] text-slate-300"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                Trend Intelligence
              </div>

              <div
                className={`rounded-xl border px-4 py-2 text-sm ${
                  isDark
                    ? "border-white/10 bg-white/[0.04] text-slate-300"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
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

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
              What we provide
            </p>

            <h2
              className={`mt-2 text-3xl font-bold ${styles.heading}`}
            >
              Intelligence built around Betuyou
            </h2>

            <p
              className={`mx-auto mt-3 max-w-2xl text-sm leading-6 ${styles.body}`}
            >
              YTA combines Betuyou data, AI agents and analytical systems
              to help users discover and understand the rapidly changing
              Betuyou ecosystem.
            </p>

          </div>


          {/* Service Cards */}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            {services.map((service) => {

              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className={`group rounded-2xl border p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${styles.card}`}
                >

                  <div className="flex items-start justify-between">

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border ${styles.iconBox}`}
                    >
                      <Icon
                        size={21}
                        className={styles.iconColor}
                      />
                    </div>

                    <span
                      className={`text-[9px] font-semibold tracking-widest ${styles.smallMuted}`}
                    >
                      {service.tag}
                    </span>

                  </div>


                  <h3
                    className={`mt-5 text-lg font-semibold ${styles.heading}`}
                  >
                    {service.title}
                  </h3>


                  <p
                    className={`mt-3 text-sm leading-6 ${styles.body}`}
                  >
                    {service.description}
                  </p>


                  <div
                    className={`mt-5 flex items-center gap-1 text-xs font-medium opacity-0 transition group-hover:opacity-100 ${
                      isDark
                        ? "text-blue-400"
                        : "text-blue-600"
                    }`}
                  >
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

          <div
            className={`overflow-hidden rounded-3xl border p-7 backdrop-blur-xl transition-colors duration-300 lg:p-10 ${
              isDark
                ? "border-white/10 bg-gradient-to-br from-blue-500/[0.08] to-purple-500/[0.06]"
                : "border-slate-200 bg-gradient-to-br from-blue-50 to-purple-50"
            }`}
          >

            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">

              <div>

                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border ${styles.iconBox}`}
                >
                  <Newspaper
                    size={21}
                    className={styles.iconColor}
                  />
                </div>


                <h2
                  className={`text-2xl font-bold lg:text-3xl ${styles.heading}`}
                >
                  Stay informed about what matters
                </h2>


                <p
                  className={`mt-4 max-w-2xl text-sm leading-7 ${styles.body}`}
                >
                  YTA provides curated information from the Betuyou
                  ecosystem across technology, artificial intelligence,
                  education, scholarships and emerging trends.
                </p>


                <p
                  className={`mt-3 max-w-2xl text-sm leading-7 ${styles.muted}`}
                >
                  Instead of searching through thousands of videos,
                  users can quickly discover the topics and information
                  that matter to them.
                </p>

              </div>


              {/* Information Categories */}

              <div className="grid grid-cols-2 gap-3">

                <div
                  className={`rounded-2xl border p-5 ${styles.border} ${styles.softBackground}`}
                >
                  <p className={`text-2xl font-bold ${styles.heading}`}>
                    AI
                  </p>

                  <p className={`mt-1 text-xs ${styles.muted}`}>
                    Technology & Research
                  </p>
                </div>


                <div
                  className={`rounded-2xl border p-5 ${styles.border} ${styles.softBackground}`}
                >
                  <p className={`text-2xl font-bold ${styles.heading}`}>
                    EDU
                  </p>

                  <p className={`mt-1 text-xs ${styles.muted}`}>
                    Courses & Learning
                  </p>
                </div>


                <div
                  className={`rounded-2xl border p-5 ${styles.border} ${styles.softBackground}`}
                >
                  <p className={`text-2xl font-bold ${styles.heading}`}>
                    UNI
                  </p>

                  <p className={`mt-1 text-xs ${styles.muted}`}>
                    Universities
                  </p>
                </div>


                <div
                  className={`rounded-2xl border p-5 ${styles.border} ${styles.softBackground}`}
                >
                  <p className={`text-2xl font-bold ${styles.heading}`}>
                    🔥
                  </p>

                  <p className={`mt-1 text-xs ${styles.muted}`}>
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

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-500">
              Our approach
            </p>

            <h2
              className={`mt-2 text-3xl font-bold ${styles.heading}`}
            >
              From Betuyou data to intelligence
            </h2>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            {capabilities.map((item, index) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`relative rounded-2xl border p-7 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${styles.card}`}
                >

                  <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full border ${styles.purpleIconBox}`}
                  >
                    <Icon
                      size={21}
                      className={styles.purpleIcon}
                    />
                  </div>


                  <div
                    className={`mt-5 text-xs font-semibold ${styles.smallMuted}`}
                  >
                    0{index + 1}
                  </div>


                  <h3
                    className={`mt-1 text-lg font-semibold ${styles.heading}`}
                  >
                    {item.title}
                  </h3>


                  <p
                    className={`mt-2 text-sm leading-6 ${styles.body}`}
                  >
                    {item.text}
                  </p>


                  {index < capabilities.length - 1 && (
                    <ArrowRight
                      size={18}
                      className={`absolute -right-3 top-1/2 hidden -translate-y-1/2 md:block ${
                        isDark
                          ? "text-slate-700"
                          : "text-slate-300"
                      }`}
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

            <h2
              className={`text-2xl font-bold ${styles.heading}`}
            >
              Understand Betuyou. Smarter.
            </h2>


            <p
              className={`mt-3 text-sm leading-6 ${styles.muted}`}
            >
              YTA brings Betuyou trends, information and AI-powered
              analysis together in one intelligent platform.
            </p>


            <div
              className={`mt-6 inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium ${
                isDark
                  ? "border-blue-400/20 bg-blue-500/10 text-blue-300"
                  : "border-blue-200 bg-blue-50 text-blue-600"
              }`}
            >
              <Bot size={16} />
              Powered by Betuyou Intelligence
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}