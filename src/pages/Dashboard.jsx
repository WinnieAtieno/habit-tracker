import React, { useState } from "react";

import { useHabits } from "../context/HabitContext";
import { useAuth } from "../context/AuthContext";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import HabitList from "../components/dashboard/HabitList";
import StatsPanel from "../components/dashboard/StatsPanel";

import { useDashboardStats } from "../hooks/useDashboardStats";
import { useInitials } from "../hooks/useInitials";

function Dashboard() {
  const { user } = useAuth() || {};
  const { habits, toggleComplete } = useHabits();

  const { completedCount, progress } = useDashboardStats(habits);
  const initials = useInitials(user?.name);

  const [filter, setFilter] = useState("all");
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const alerts = [
    {
      id: 1,
      text: `You completed ${completedCount} of ${habits.length} habits today.`,
      time: "Now",
    },
    {
      id: 2,
      text:
        progress === 100
          ? "Perfect day completed 🎉"
          : "Keep going. You're making progress.",
      time: "1h ago",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8 space-y-5">

      <DashboardHeader
        userName={user?.name || "HabitFlow User"}
        initials={initials}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        hasUnread={hasUnread}
        setHasUnread={setHasUnread}
        alerts={alerts}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">

        {/* LEFT */}
        <div className="xl:col-span-8">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col xl:h-[82vh]">

            <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
              <span className="text-sm font-bold text-slate-700">
                Daily Habits 
              </span>
            </div>

            <HabitList
              habits={habits}
              filter={filter}
              toggleComplete={toggleComplete}
            />

          </div>
        </div>

        {/* RIGHT */}
        <div className="xl:col-span-4 space-y-5 xl:sticky xl:top-5 self-start">
          <StatsPanel
            completedCount={completedCount}
            progress={progress}
          />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;