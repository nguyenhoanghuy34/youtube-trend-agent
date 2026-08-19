export default function VideoCard({ video, theme = "light" }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex h-32 overflow-hidden rounded-lg border transition hover:shadow-sm ${theme === "dark" ? "border-slate-700 bg-slate-900 hover:border-slate-600" : "border-slate-200 bg-white hover:border-slate-300"}`}
    >
      {/* Thumbnail */}
      <div className={`relative w-48 shrink-0 ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
        <img
          src={`https://i.ytimg.com/vi/${video.video_id}/hqdefault.jpg`}
          alt={video.title}
          className="h-full w-full object-cover"
        />

        {/* Rank */}
        <div className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
          #{video.rank}
        </div>
      </div>

      {/* Information */}
      <div className="flex min-w-0 flex-1 flex-col justify-between p-3">

        {/* Title */}
        <div>
          <h3 className={`line-clamp-2 text-sm font-semibold leading-5 ${theme === "dark" ? "text-slate-50" : "text-slate-900"}`}>
            {video.title}
          </h3>

          <p className={`mt-1 truncate text-xs ${theme === "dark" ? "text-slate-300" : "text-slate-500"}`}>
            {video.channel}
          </p>
        </div>

        {/* Metrics */}
        <div className={`flex items-center gap-3 text-[11px] ${theme === "dark" ? "text-slate-300" : "text-slate-500"}`}>
          <span>
            {Number(video.views || 0).toLocaleString()} views
          </span>

          <span>
            {Number(video.likes || 0).toLocaleString()} likes
          </span>

          <span>
            {Number(video.comments || 0).toLocaleString()} comments
          </span>
        </div>

        {/* Trend Score */}
        <div className="flex items-center justify-between">
          <span className={`text-[10px] ${theme === "dark" ? "text-slate-400" : "text-slate-400"}`}>
            Trend Score
          </span>

          <span className={`text-xs font-semibold ${theme === "dark" ? "text-slate-100" : "text-slate-700"}`}>
            {Number(video.trend_score || 0).toFixed(2)}
          </span>
        </div>

      </div>
    </a>
  );
}
