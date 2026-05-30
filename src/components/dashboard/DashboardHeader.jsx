import {
  BellIcon,
} from "@heroicons/react/24/outline";

export default function DashboardHeader({
  userName,
  initials,
  showNotifications,
  setShowNotifications,
  hasUnread,
  setHasUnread,
  alerts,
}) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 flex items-center justify-between relative">

      {/* LEFT */}
      <div>
        <h1 className="text-lg font-extrabold text-slate-900">
          Workspace 
        </h1>

        <p className="text-xs text-slate-400 mt-0.5">
          {userName}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* NOTIFICATIONS */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className={`relative p-2 rounded-xl transition ${
            showNotifications
              ? "bg-slate-100 text-slate-700"
              : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
          }`}
        >
          <BellIcon className="w-5 h-5" />

          {hasUnread && (
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500" />
          )}
        </button>

        {/* DROPDOWN */}
        {showNotifications && (
          <div className="absolute right-4 top-16 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden z-50">

            <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <span className="text-xs font-bold text-slate-700">
                Notifications
              </span>

              {hasUnread && (
                <button
                  onClick={() => setHasUnread(false)}
                  className="text-[10px] font-bold text-emerald-600"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-3 hover:bg-slate-50 transition">
                  <p className="text-xs text-slate-600">
                    {alert.text}
                  </p>

                  <span className="text-[10px] text-slate-400 block mt-1">
                    {alert.time}
                  </span>
                </div>
              ))}
            </div>

          </div>
        )}

        <div className="w-px h-5 bg-slate-200" />

        {/* AVATAR */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-orange-400 text-white flex items-center justify-center text-xs font-black shadow-sm">
          {initials}
        </div>

      </div>
    </div>
  );
}