import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import BottomNav from "../components/layout/BottomNav";

import ChatPanel from "../components/chat/ChatPanel";
import ReportPanel from "../components/reports/ReportPanel";

export default function Home() {
  const [videos, setVideos] = useState([]);

  return (
    <div className="flex h-screen flex-col bg-slate-50">

      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <main className="min-h-0 flex-1">

        <div className="grid h-full grid-cols-2">

          {/* Chat */}
          <div className="min-h-0 border-r border-slate-200 bg-white">
            <ChatPanel
              onVideosUpdate={setVideos}
            />
          </div>

          {/* Intelligence Output */}
          <div className="min-h-0 bg-slate-50">
            <ReportPanel
              videos={videos}
            />
          </div>

        </div>

      </main>

      {/* Footer / Bottom Nav */}
      <BottomNav />

    </div>
  );
}