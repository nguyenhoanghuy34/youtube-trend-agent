import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import ChatPanel from "../chat/ChatPanel";
import ReportPanel from "../reports/ReportPanel";

export default function MainLayout() {
  return (
    <div className="flex h-screen flex-col bg-white">

      <Navbar theme="light" onThemeChange={() => {}} />

      <main className="min-h-0 flex-1 p-4">

        <div className="grid h-full min-h-0 grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="min-h-0 border-r border-slate-200">
            <ChatPanel theme="light" />
          </div>

          <div className="min-h-0">
            <ReportPanel theme="light" />
          </div>

        </div>

      </main>

      <BottomNav theme="light" />

    </div>
  );
}
