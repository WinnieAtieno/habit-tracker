import { Link } from "react-router-dom";
import {
  PlusCircleIcon,
  ChartBarIcon,
  FireIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-emerald-500 to-orange-400 rounded-2xl p-10 text-white">
          <h1 className="text-4xl font-bold">Build Better Habits Daily</h1>
          <p className="mt-2 text-white/90">
            Track your habits, stay consistent, and improve your life step by step.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              to="/add-task"
              className="bg-white text-emerald-600 px-5 py-2 rounded-lg font-semibold flex items-center gap-2"
            >
              <PlusCircleIcon className="w-5 h-5" />
              Add Habit
            </Link>

            <Link
              to="/dashboard"
              className="bg-black/20 hover:bg-black/30 px-5 py-2 rounded-lg font-semibold flex items-center gap-2"
            >
              <ChartBarIcon className="w-5 h-5" />
              View Progress
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <FireIcon className="w-8 h-8 text-orange-500" />
            <h2 className="text-lg font-semibold mt-3">Stay Consistent</h2>
            <p className="text-gray-500 mt-1">
              Build streaks and keep your momentum going every day.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <CheckCircleIcon className="w-8 h-8 text-emerald-500" />
            <h2 className="text-lg font-semibold mt-3">Track Completion</h2>
            <p className="text-gray-500 mt-1">
              Mark habits done and monitor your daily progress.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <ChartBarIcon className="w-8 h-8 text-orange-500" />
            <h2 className="text-lg font-semibold mt-3">Analyze Growth</h2>
            <p className="text-gray-500 mt-1">
              Understand your patterns and improve over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;