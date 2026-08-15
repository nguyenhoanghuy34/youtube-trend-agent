import VideoCard from "./VideoCard";

export default function ReportPanel({ videos = [] }) {
  return (
    <section className="flex h-full min-h-0 flex-col">

      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Intelligence Output
        </h2>

        <p className="text-xs text-slate-500">
          Current YouTube trending videos
        </p>
      </div>

      {/* Videos */}
      <div className="flex-1 space-y-4 overflow-y-auto p-5">

        {videos.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-slate-400">
              Ask the agent about YouTube trends to generate a report.
            </p>
          </div>
        ) : (
          videos.map((video) => (
            <VideoCard
              key={video.video_id}
              video={video}
            />
          ))
        )}

      </div>

    </section>
  );
}