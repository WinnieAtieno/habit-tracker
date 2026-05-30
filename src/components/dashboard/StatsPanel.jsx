export default function StatsPanel({ completedCount, progress }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 space-y-5">

      <div>
        <h2 className="text-sm font-bold text-slate-900">
          Today's Progress
        </h2>

        <p className="text-xs text-slate-400 mt-1">
          Your activity summary.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">

        <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Completed
          </span>

          <h3 className="text-2xl font-black text-emerald-500 mt-1">
            {completedCount}
          </h3>
        </div>

        <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Progress
          </span>

          <h3 className="text-2xl font-black text-slate-800 mt-1">
            {progress}%
          </h3>
        </div>

      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Daily Completion</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
          />
        </div>
      </div>

    </div>
  );
}