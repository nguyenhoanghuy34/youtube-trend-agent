import { useState } from "react";

import ChatPanel from "../components/chat/ChatPanel";
import ReportPanel from "../components/reports/ReportPanel";

export default function ChatPage() {
  const [videos, setVideos] = useState([]);

  return (
    <div className="grid h-full min-h-0 grid-cols-2">

      {/* Left - Chat */}
      <div className="min-h-0 border-r border-slate-200 bg-white">
        <ChatPanel
          onVideosUpdate={setVideos}
        />
      </div>

      {/* Right - Reports */}
      <div className="min-h-0 bg-slate-50">
        <ReportPanel
          videos={videos}
        />
      </div>

    </div>
  );
}