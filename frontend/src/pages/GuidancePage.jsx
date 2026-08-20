import {
  MessageSquare,
  TrendingUp,
  Search,
  BarChart3,
  Users,
  Lightbulb,
  Target,
  FileText,
  Bell,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";

const guides = [
  {
    id: 1,
    icon: MessageSquare,
    title: "General Knowledge Chat",
    category: "AI CHAT",
    status: "available",
    description:
      "Ask the agent questions about AI, technology, education, data science and other supported topics.",
    howTo:
      "Type your question in the chat box and the agent will generate an answer based on its available knowledge.",
    example:
      "Example: Explain the difference between RAG and fine-tuning.",
  },
  {
    id: 2,
    icon: TrendingUp,
    title: "Top 10 BetuYou Trends",
    category: "TREND",
    status: "available",
    description:
      "Discover the current top 10 trending videos and topics from BetuYou.",
    howTo:
      "Ask the agent for the current top 10 BetuYou trending videos. The agent retrieves and analyzes the latest available trend data.",
    example:
      "Example: Show me the top 10 trending videos.",
  },
  {
    id: 3,
    icon: Search,
    title: "Trend Discovery",
    category: "DISCOVERY",
    status: "coming",
    description:
      "Discover emerging topics before they become major trends.",
    howTo:
      "The agent will analyze recent BetuYou activity and identify topics with rapidly increasing attention.",
    example:
      "Coming soon: Discover rising AI topics.",
  },
  {
    id: 4,
    icon: BarChart3,
    title: "Channel Analytics",
    category: "ANALYTICS",
    status: "coming",
    description:
      "Analyze the performance and growth patterns of a BetuYou channel.",
    howTo:
      "Provide a channel and the agent will generate an analytical report covering views, engagement and content patterns.",
    example:
      "Coming soon: Analyze a technology channel.",
  },
  {
    id: 5,
    icon: Users,
    title: "Audience Insights",
    category: "AUDIENCE",
    status: "coming",
    description:
      "Understand who is watching specific content and what audiences are interested in.",
    howTo:
      "The agent will analyze available content and engagement signals to identify audience characteristics and interests.",
    example:
      "Coming soon: Analyze the audience of an AI channel.",
  },
  {
    id: 6,
    icon: Lightbulb,
    title: "Content Ideas",
    category: "IDEATION",
    status: "coming",
    description:
      "Generate content ideas based on current trends and audience interests.",
    howTo:
      "Give the agent a topic or channel category and it will suggest potential content ideas based on emerging trends.",
    example:
      "Coming soon: Generate 10 AI video ideas.",
  },
  {
    id: 7,
    icon: Target,
    title: "Competitor Intelligence",
    category: "COMPETITOR",
    status: "coming",
    description:
      "Compare channels and discover what competitors are doing successfully.",
    howTo:
      "Enter one or more channels and the agent will compare their content strategies, topics and performance.",
    example:
      "Coming soon: Compare two AI channels.",
  },
  {
    id: 8,
    icon: FileText,
    title: "Trend Reports",
    category: "REPORT",
    status: "coming",
    description:
      "Generate structured intelligence reports from BetuYou trend data.",
    howTo:
      "Ask the agent to create a report for a specific topic, time period or category.",
    example:
      "Coming soon: Generate today's AI trend report.",
  },
  {
    id: 9,
    icon: Bell,
    title: "Trend Alerts",
    category: "ALERT",
    status: "coming",
    description:
      "Receive notifications when important topics or trends start accelerating.",
    howTo:
      "Set a topic or category and the system will monitor relevant trend signals.",
    example:
      "Coming soon: Alert me when a new AI trend appears.",
  },
  {
    id: 10,
    icon: Sparkles,
    title: "AI Trend Prediction",
    category: "PREDICTION",
    status: "coming",
    description:
      "Estimate which topics may become popular based on historical and current trend signals.",
    howTo:
      "The agent will combine historical trend data with current signals to estimate potential future trends.",
    example:
      "Coming soon: Predict the next AI trend.",
  },
];

function StatusBadge({ status, isDark }) {
  if (status === "available") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
          isDark
            ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-400"
            : "border-emerald-200 bg-emerald-50 text-emerald-600"
        }`}
      >
        <CheckCircle2 size={11} />
        Available
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
        isDark
          ? "border-slate-600/40 bg-slate-700/30 text-slate-500"
          : "border-slate-200 bg-slate-100 text-slate-500"
      }`}
    >
      <Lock size={10} />
      Coming Soon
    </span>
  );
}

function GuideCard({ guide, isDark }) {
  const Icon = guide.icon;
  const isAvailable = guide.status === "available";

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition duration-300 ${
        isAvailable
          ? isDark
            ? "border-white/10 bg-slate-900/50 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-slate-900/70"
            : "border-slate-200 bg-white hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100"
          : isDark
            ? "border-white/5 bg-slate-900/25 opacity-55"
            : "border-slate-200 bg-slate-100/60 opacity-55"
      }`}
    >
      {/* Coming Soon Overlay */}

      {!isAvailable && (
        <div className="pointer-events-none absolute right-4 top-4">
          <Lock
            size={15}
            className={
              isDark ? "text-slate-600" : "text-slate-400"
            }
          />
        </div>
      )}

      {/* Icon */}

      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
          isAvailable
            ? isDark
              ? "border-blue-400/20 bg-blue-500/10"
              : "border-blue-200 bg-blue-50"
            : isDark
              ? "border-white/5 bg-white/[0.03]"
              : "border-slate-200 bg-slate-100"
        }`}
      >
        <Icon
          size={21}
          className={
            isAvailable
              ? isDark
                ? "text-blue-400"
                : "text-blue-600"
              : isDark
                ? "text-slate-600"
                : "text-slate-400"
          }
        />
      </div>

      {/* Header */}

      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <p
            className={`text-[9px] font-semibold tracking-[0.18em] ${
              isAvailable
                ? isDark
                  ? "text-blue-400"
                  : "text-blue-600"
                : isDark
                  ? "text-slate-600"
                  : "text-slate-400"
            }`}
          >
            {guide.category}
          </p>

          <h3
            className={`mt-1 text-lg font-semibold ${
              isAvailable
                ? isDark
                  ? "text-white"
                  : "text-slate-900"
                : isDark
                  ? "text-slate-500"
                  : "text-slate-500"
            }`}
          >
            {guide.title}
          </h3>
        </div>

        <StatusBadge
          status={guide.status}
          isDark={isDark}
        />
      </div>

      {/* Description */}

      <p
        className={`mt-4 text-sm leading-6 ${
          isAvailable
            ? isDark
              ? "text-slate-400"
              : "text-slate-600"
            : isDark
              ? "text-slate-600"
              : "text-slate-400"
        }`}
      >
        {guide.description}
      </p>

      {/* How to use */}

      <div
        className={`mt-5 rounded-xl border p-4 ${
          isAvailable
            ? isDark
              ? "border-white/5 bg-white/[0.03]"
              : "border-slate-200 bg-slate-50"
            : isDark
              ? "border-white/5 bg-white/[0.02]"
              : "border-slate-200 bg-slate-50/70"
        }`}
      >
        <p
          className={`text-[10px] font-semibold uppercase tracking-wider ${
            isDark ? "text-slate-500" : "text-slate-500"
          }`}
        >
          How to use
        </p>

        <p
          className={`mt-2 text-xs leading-5 ${
            isAvailable
              ? isDark
                ? "text-slate-400"
                : "text-slate-600"
              : isDark
                ? "text-slate-600"
                : "text-slate-400"
          }`}
        >
          {guide.howTo}
        </p>
      </div>

      {/* Example */}

      <div className="mt-4 flex items-start gap-2">
        <ArrowRight
          size={13}
          className={`mt-0.5 flex-shrink-0 ${
            isAvailable
              ? isDark
                ? "text-blue-400"
                : "text-blue-600"
              : isDark
                ? "text-slate-700"
                : "text-slate-400"
          }`}
        />

        <p
          className={`text-xs italic leading-5 ${
            isAvailable
              ? isDark
                ? "text-slate-500"
                : "text-slate-500"
              : isDark
                ? "text-slate-700"
                : "text-slate-400"
          }`}
        >
          {guide.example}
        </p>
      </div>
    </article>
  );
}

export default function Guidance({ theme = "dark" }) {
  const isDark = theme === "dark";

  const availableCount = guides.filter(
    (guide) => guide.status === "available"
  ).length;

  const comingSoonCount = guides.length - availableCount;

  return (
    <main
      className={`h-full overflow-y-auto transition-colors duration-300 ${
        isDark
          ? "text-slate-100"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-6 py-10 lg:px-10">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="mb-10">

          <div className="flex items-start justify-between gap-6">

            <div className="flex items-start gap-4">

              <div
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border ${
                  isDark
                    ? "border-blue-400/20 bg-blue-500/10"
                    : "border-blue-200 bg-blue-50"
                }`}
              >
                <Sparkles
                  size={23}
                  className={
                    isDark
                      ? "text-blue-400"
                      : "text-blue-600"
                  }
                />
              </div>

              <div>

                <p
                  className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                    isDark
                      ? "text-blue-400"
                      : "text-blue-600"
                  }`}
                >
                  Agent Guide
                </p>

                <h1
                  className={`mt-1 text-3xl font-bold tracking-tight ${
                    isDark
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  How to use BetuYou Agent
                </h1>

                <p
                  className={`mt-3 max-w-2xl text-sm leading-6 ${
                    isDark
                      ? "text-slate-400"
                      : "text-slate-600"
                  }`}
                >
                  Explore the available capabilities of the BetuYou
                  intelligence agent and learn how to interact with
                  each feature.
                </p>

              </div>

            </div>


            {/* Status Summary */}

            <div
              className={`hidden rounded-2xl border px-5 py-4 sm:block ${
                isDark
                  ? "border-white/10 bg-slate-900/40"
                  : "border-slate-200 bg-white"
              }`}
            >

              <p
                className={`text-[10px] font-semibold uppercase tracking-wider ${
                  isDark
                    ? "text-slate-500"
                    : "text-slate-500"
                }`}
              >
                Development Status
              </p>

              <div className="mt-2 flex items-center gap-4">

                <div>
                  <p
                    className={`text-xl font-bold ${
                      isDark
                        ? "text-emerald-400"
                        : "text-emerald-600"
                    }`}
                  >
                    {availableCount}
                  </p>

                  <p
                    className={`text-[10px] ${
                      isDark
                        ? "text-slate-600"
                        : "text-slate-500"
                    }`}
                  >
                    Available
                  </p>
                </div>

                <div
                  className={`h-8 w-px ${
                    isDark
                      ? "bg-white/10"
                      : "bg-slate-200"
                  }`}
                />

                <div>
                  <p
                    className={`text-xl font-bold ${
                      isDark
                        ? "text-slate-500"
                        : "text-slate-400"
                    }`}
                  >
                    {comingSoonCount}
                  </p>

                  <p
                    className={`text-[10px] ${
                      isDark
                        ? "text-slate-600"
                        : "text-slate-500"
                    }`}
                  >
                    Coming Soon
                  </p>
                </div>

              </div>

            </div>

          </div>

        </header>


        {/* =====================================================
            QUICK START
        ====================================================== */}

        <section
          className={`mb-10 rounded-2xl border p-6 ${
            isDark
              ? "border-blue-400/10 bg-blue-500/[0.04]"
              : "border-blue-200 bg-blue-50/70"
          }`}
        >

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <MessageSquare
                  size={17}
                  className={
                    isDark
                      ? "text-blue-400"
                      : "text-blue-600"
                  }
                />

                <h2
                  className={`text-sm font-semibold ${
                    isDark
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  Quick Start
                </h2>

              </div>

              <p
                className={`mt-2 text-sm leading-6 ${
                  isDark
                    ? "text-slate-400"
                    : "text-slate-600"
                }`}
              >
                Start by opening Chat With Agent. You can ask general
                questions or request the current top 10 BetuYou trends.
              </p>

            </div>


            <div className="flex flex-wrap gap-2">

              <span
                className={`rounded-lg border px-3 py-2 text-xs ${
                  isDark
                    ? "border-white/10 bg-white/[0.04] text-slate-300"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                01 — Ask a question
              </span>

              <span
                className={`rounded-lg border px-3 py-2 text-xs ${
                  isDark
                    ? "border-white/10 bg-white/[0.04] text-slate-300"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                02 — Get intelligence
              </span>

            </div>

          </div>

        </section>


        {/* =====================================================
            GUIDE GRID
        ====================================================== */}

        <section>

          <div className="mb-6">

            <h2
              className={`text-xl font-bold ${
                isDark
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              Agent Capabilities
            </h2>

            <p
              className={`mt-1 text-sm ${
                isDark
                  ? "text-slate-500"
                  : "text-slate-600"
              }`}
            >
              Learn what the agent can do and what features are
              currently under development.
            </p>

          </div>


          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {guides.map((guide) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                isDark={isDark}
              />
            ))}

          </div>

        </section>


        {/* =====================================================
            FOOTER
        ====================================================== */}

        <section className="py-14 text-center">

          <p
            className={`text-xs ${
              isDark
                ? "text-slate-600"
                : "text-slate-500"
            }`}
          >
            More BetuYou Agent capabilities will be available soon.
          </p>

        </section>

      </div>
    </main>
  );
}