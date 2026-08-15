export default function VideoCard({ video }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img
          src={`https://i.ytimg.com/vi/${video.video_id}/hqdefault.jpg`}
          alt={video.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
          #{video.rank}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">

        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-900">
          {video.title}
        </h3>

        <p className="mt-2 text-xs font-medium text-slate-500">
          {video.channel}
        </p>

        {/* Metrics */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
          <span>
            👁 {Number(video.views || 0).toLocaleString()}
          </span>

          <span>
            👍 {Number(video.likes || 0).toLocaleString()}
          </span>

          <span>
            💬 {Number(video.comments || 0).toLocaleString()}
          </span>
        </div>

        {/* Trend score */}
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs text-slate-400">
            Trend Score
          </span>

          <span className="text-sm font-semibold text-slate-900">
            {Number(video.trend_score || 0).toFixed(2)}
          </span>
        </div>

      </div>
    </a>
  );
}