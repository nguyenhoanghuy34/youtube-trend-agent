import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import ChatPanel from "../chat/ChatPanel";
import ReportPanel from "../reports/ReportPanel";

export default function MainLayout() {
  return (
    <div className="flex h-screen flex-col bg-slate-50">

      <Navbar />

      <main className="min-h-0 flex-1 p-4">

        <div className="grid h-full min-h-0 grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="min-h-0 border-r border-slate-200">
            <ChatPanel />
          </div>

          <div className="min-h-0">
            <ReportPanel />
          </div>

        </div>

      </main>

      <BottomNav />

    </div>
  );
}
