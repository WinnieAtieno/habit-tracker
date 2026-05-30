import React from "react";
import { Link } from "react-router-dom";
import {
  PlusCircleIcon,
  ChartBarIcon,
  FireIcon,
  CheckCircleIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext"; 

function Home() {
  const { user } = useAuth() || { user: null }; 
  const isAuthenticated = Boolean(user);

  const primaryCTA = isAuthenticated ? "/add-task" : "/auth";
  const secondaryCTA = isAuthenticated ? "/dashboard" : "/auth";

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Hero Banner Grid Card */}
        <div className="bg-gradient-to-br from-emerald-500 to-orange-400 rounded-2xl p-8 sm:p-12 text-white shadow-md shadow-emerald-500/5 relative overflow-hidden">
        
          <SparklesIcon className="absolute right-0 bottom-0 w-64 h-64 text-white/5 translate-x-10 translate-y-10 pointer-events-none" />
          
          <div className="max-w-xl space-y-3 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-md">
              Welcome to HabitFlow
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Build Better Habits Daily
            </h1>
            <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed">
              Track your habits, keep your daily streaks alive, and improve your life step by step.
            </p>
          </div>

          {/* Buttons Container */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 relative z-10">
            <Link
              to={primaryCTA}
              className="bg-white text-slate-900 hover:bg-slate-50 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition active:scale-[0.98] shadow-sm"
            >
              <PlusCircleIcon className="w-4 h-4 text-emerald-600" />
              {isAuthenticated ? "Add Habit" : "Get Started Free"}
            </Link>

            <Link
              to={secondaryCTA}
              className="bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition active:scale-[0.98]"
            >
              <ChartBarIcon className="w-4 h-4" />
              {isAuthenticated ? "View Dashboard" : "Sign In"}
            </Link>
          </div>
        </div>

        {/* Dynamic Features Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Feature Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200/60 transition-all duration-200 space-y-4">
            <div className="p-3 bg-orange-50 text-orange-500 rounded-xl inline-block">
              <FireIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-800">Stay Consistent</h2>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Build daily streaks and use visual momentum to keep yourself going every single day.
              </p>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200/60 transition-all duration-200 space-y-4">
            <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl inline-block">
              <CheckCircleIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-800">Track Completion</h2>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Check off your habits with a single click and watch your daily progress bar grow instantly.
              </p>
            </div>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200/60 transition-all duration-200 sm:col-span-2 lg:col-span-1 space-y-4">
            <div className="p-3 bg-blue-50 text-blue-500 rounded-xl inline-block">
              <ChartBarIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-800">See Your History</h2>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Review your weekly calendar charts to easily understand your patterns and make steady progress.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;
