import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Play,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const hotNews = [
  {
    id: 1,
    category: "AI",
    time: "2 hours ago",
    source: "YouTube Tech",
    title: "AI Agents Are Changing How Developers Build Software",
    description:
      "A new wave of AI agents is changing the way developers write, test and deploy software.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    category: "AI Research",
    time: "4 hours ago",
    source: "AI Explained",
    title: "The New Generation of Multimodal AI Models Explained",
    description:
      "How modern AI systems combine text, images, audio and video into a single intelligent workflow.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    category: "Education",
    time: "6 hours ago",
    source: "Data Science Academy",
    title: "5 AI Courses Every Data Scientist Should Take in 2026",
    description:
      "A practical guide to the most useful AI and machine learning courses for aspiring data scientists.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    category: "University",
    time: "8 hours ago",
    source: "Future University",
    title: "Universities Are Expanding Their AI Research Programs",
    description:
      "Top universities are investing heavily in artificial intelligence research and new AI degree programs.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    category: "Scholarship",
    time: "10 hours ago",
    source: "Study Abroad",
    title: "New AI Scholarships Open for International Students",
    description:
      "Several universities announce new scholarship opportunities for students interested in AI research.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=85",
  },
];

const otherNews = [
  {
    id: 6,
    category: "AI",
    time: "5 hours ago",
    source: "AI Explained",
    title: "How AI Agents Actually Work",
    description:
      "A visual explanation of planning, tool usage, memory and reasoning inside modern AI agents.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 7,
    category: "Tutorial",
    time: "8 hours ago",
    source: "Data Science Academy",
    title: "Build Your First RAG Application From Scratch",
    description:
      "A practical YouTube tutorial covering embeddings, vector databases, retrieval and generation.",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 8,
    category: "Education",
    time: "12 hours ago",
    source: "ML University",
    title: "Machine Learning Roadmap for Beginners in 2026",
    description:
      "A complete learning roadmap covering Python, statistics, machine learning and deep learning.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 9,
    category: "Scholarship",
    time: "1 day ago",
    source: "Study Abroad",
    title: "Top Universities Offering AI Scholarships",
    description:
      "A guide to universities that offer funding opportunities for AI and computer science students.",
    image:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 10,
    category: "Technology",
    time: "1 day ago",
    source: "Tech Insider",
    title: "What Will AI Look Like in the Next Five Years?",
    description:
      "Researchers and technology creators discuss the future of AI, robotics and intelligent systems.",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 11,
    category: "Career",
    time: "2 days ago",
    source: "Tech Career",
    title: "The Most Valuable AI Skills for Data Scientists",
    description:
      "From LLMs to MLOps, these are the skills companies are increasingly looking for.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=85",
  },
];

function CategoryBadge({ category }) {
  return (
    <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-[11px] font-medium text-blue-300">
      {category}
    </span>
  );
}

function HotNewsCard({ news }) {
  return (
    <article className="group relative min-w-[320px] max-w-[360px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-blue-950/30">
      {/* Image */}
      <div className="relative h-[230px] overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* YouTube icon */}
        <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-red-600 shadow-lg">
          <Play size={16} fill="white" className="ml-0.5 text-white" />
        </div>

        <div className="absolute bottom-4 left-4">
          <CategoryBadge category={news.category} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
          <span>{news.source}</span>
          <span>•</span>
          <Clock3 size={12} />
          <span>{news.time}</span>
        </div>

        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-100 transition group-hover:text-blue-300">
          {news.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-400">
          {news.description}
        </p>
      </div>
    </article>
  );
}

function NewsListCard({ news }) {
  return (
    <article className="group flex gap-5 rounded-2xl border border-white/10 bg-slate-900/45 p-3 backdrop-blur-xl transition duration-300 hover:border-white/15 hover:bg-white/[0.06]">
      <div className="relative h-[150px] w-[220px] flex-shrink-0 overflow-hidden rounded-xl">
        <img
          src={news.image}
          alt={news.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />

        <div className="absolute bottom-3 left-3">
          <CategoryBadge category={news.category} />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center py-2 pr-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
          <span>{news.source}</span>
          <span>•</span>
          <span>{news.time}</span>
        </div>

        <h3 className="text-lg font-semibold leading-snug text-slate-100 transition group-hover:text-blue-300">
          {news.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
          {news.description}
        </p>

        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-blue-400 opacity-0 transition group-hover:opacity-100">
          Read intelligence
          <ChevronRight size={14} />
        </div>
      </div>
    </article>
  );
}

export default function NewsPage({ theme = "dark" }) {
  const hotNewsRef = useRef(null);

  const scrollHotNews = (direction) => {
    if (!hotNewsRef.current) return;

    hotNewsRef.current.scrollBy({
      left: direction * 380,
      behavior: "smooth",
    });
  };

  const isDark = theme === "dark";

  return (
    <main
      className={`h-full overflow-y-auto ${
        isDark ? "text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 py-7 lg:px-10">
        {/* ================= HEADER ================= */}
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
              <Sparkles size={20} className="text-blue-400" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-100">
                News
              </h1>

              <p className="mt-0.5 text-sm text-slate-500">
                Latest YouTube & technology intelligence
              </p>
            </div>
          </div>
        </header>

        {/* ================= HOT NEWS ================= */}
        <section className="mb-10">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={19} className="text-orange-400" />

              <h2 className="text-lg font-semibold text-slate-100">
                Hot News
              </h2>

              <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange-400">
                Trending
              </span>
            </div>

            {/* Carousel controls */}
            <div className="flex gap-2">
              <button
                onClick={() => scrollHotNews(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() => scrollHotNews(1)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Horizontal carousel */}
          <div
            ref={hotNewsRef}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {hotNews.map((news) => (
              <HotNewsCard key={news.id} news={news} />
            ))}
          </div>
        </section>

        {/* ================= OTHER NEWS ================= */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                Tin tức khác
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                More stories from YouTube, AI and education
              </p>
            </div>

            <span className="hidden text-xs text-slate-600 sm:block">
              {otherNews.length} stories
            </span>
          </div>

          <div className="grid gap-4">
            {otherNews.map((news) => (
              <NewsListCard key={news.id} news={news} />
            ))}
          </div>
        </section>

        {/* Bottom spacing */}
        <div className="h-10" />
      </div>
    </main>
  );
}