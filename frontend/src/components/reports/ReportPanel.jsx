export default function ReportPanel({
  reports = [],
  theme = "light",
}) {
  return (
    <section className="flex h-full min-h-0 flex-col">

      {/* Header */}

      <div
        className={`border-b px-5 py-4 ${
          theme === "dark"
            ? "border-slate-800"
            : "border-slate-200"
        }`}
      >
        <h2
          className={`text-sm font-semibold ${
            theme === "dark"
              ? "text-slate-50"
              : "text-slate-900"
          }`}
        >
          Intelligence Output
        </h2>

        <p
          className={`text-xs ${
            theme === "dark"
              ? "text-slate-300"
              : "text-slate-500"
          }`}
        >
          Current YouTube trending videos
        </p>
      </div>


      {/* Reports */}

      <div className="flex-1 space-y-6 overflow-y-auto p-5">

        {reports.length === 0 ? (

          <div className="flex h-full items-center justify-center">

            <p
              className={`text-sm ${
                theme === "dark"
                  ? "text-slate-300"
                  : "text-slate-400"
              }`}
            >
              Ask the agent about YouTube trends
              to generate a report.
            </p>

          </div>

        ) : (

          reports.map((report) => (

            <article
              key={report.id}
              className={`overflow-hidden rounded-xl border ${
                theme === "dark"
                  ? "border-slate-800 bg-slate-950"
                  : "border-slate-200 bg-white"
              }`}
            >

              {/* Agent Summary */}

              <div
                className={`border-b px-4 py-4 ${
                  theme === "dark"
                    ? "border-slate-800"
                    : "border-slate-200"
                }`}
              >

                <p
                  className={`text-sm leading-6 ${
                    theme === "dark"
                      ? "text-slate-200"
                      : "text-slate-700"
                  }`}
                >
                  {report.summary}
                </p>

              </div>


              {/* Chart */}

              {report.chart?.svg ? (
                <div className="border-b border-slate-200 bg-slate-950 p-4 dark:border-slate-800">
                  <div
                    className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900"
                    dangerouslySetInnerHTML={{
                      __html: report.chart.svg,
                    }}
                  />
                </div>
              ) : null}


              {/* Videos */}

              {!report.chart?.svg ? (
                <div className="space-y-4 p-4">
                  {report.videos.map((video) => (
                    <div
                      key={video.video_id}
                      className={`rounded-lg border p-3 text-sm ${
                        theme === "dark"
                          ? "border-slate-800 text-slate-200"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      <div className="font-medium">
                        {video.title}
                      </div>
                      <div className="mt-1 text-xs opacity-75">
                        {video.channel}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

            </article>

          ))

        )}

      </div>

    </section>
  );
}
