import { useState } from "react";

import ChatPanel from "../components/chat/ChatPanel";
import ReportPanel from "../components/reports/ReportPanel";

export default function ChatPage({ theme = "light" }) {
  const [videos, setVideos] = useState([]);

  function handleVideosUpdate(newVideos) {
    setVideos((prevVideos) => {
      const existingIds = new Set(
        prevVideos.map((video) => video.video_id)
      );

      const uniqueNewVideos = newVideos.filter(
        (video) => !existingIds.has(video.video_id)
      );

      return [...prevVideos, ...uniqueNewVideos];
    });
  }

  return (
    <div
      className={`grid h-full min-h-0 grid-cols-2 ${
        theme === "dark" ? "bg-slate-950" : "bg-white"
      }`}
    >
      {/* Left - Chat */}
      <div
        className={`min-h-0 border-r ${
          theme === "dark"
            ? "border-slate-800 bg-slate-950"
            : "border-slate-200 bg-white"
        }`}
      >
        <ChatPanel
          onVideosUpdate={handleVideosUpdate}
          theme={theme}
        />
      </div>

      {/* Right - Reports */}
      <div
        className={`${
          theme === "dark" ? "bg-slate-950" : "bg-slate-50"
        } min-h-0`}
      >
        <ReportPanel
          videos={videos}
          theme={theme}
        />
      </div>
    </div>
  );
}