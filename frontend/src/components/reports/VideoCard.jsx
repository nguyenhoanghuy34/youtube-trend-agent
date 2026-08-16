export default function VideoCard({ video }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-32 overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm"
    >
      {/* Thumbnail */}
      <div className="relative w-48 shrink-0 bg-slate-100">
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
          <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-900">
            {video.title}
          </h3>

          <p className="mt-1 truncate text-xs text-slate-500">
            {video.channel}
          </p>
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-3 text-[11px] text-slate-500">
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
          <span className="text-[10px] text-slate-400">
            Trend Score
          </span>

          <span className="text-xs font-semibold text-slate-700">
            {Number(video.trend_score || 0).toFixed(2)}
          </span>
        </div>

      </div>
    </a>
  );
}