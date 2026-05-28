import React, { useState } from "react";

import {
  CheckCircleIcon,
  FireIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";

function Dashboard() {
  const [habits, setHabits] = useState([
    {
      id: crypto.randomUUID(),
      name: "Wash clothes",
      completed: true,
      streak: 2,
      category: "general",
    },
    {
      id: crypto.randomUUID(),
      name: "Code for 2 hours",
      completed: false,
      streak: 0,
      category: "professional",
    },
    {
      id: crypto.randomUUID(),
      name: "Create protected routes",
      completed: true,
      streak: 7,
      category: "professional",
    },
  ]);

  // Toggle habit completion
  const toggleComplete = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed: !habit.completed,
            }
          : habit
      )
    );
  };

  // Stats
  const completedHabits = habits.filter(
    (habit) => habit.completed
  ).length;

  const progress = Math.round(
    (completedHabits / habits.length) * 100
  );

  const highestStreak = Math.max(
    ...habits.map((habit) => habit.streak)
  );

  return (
    <>
      {/* Header */}
      <header className="bg-gray-50 text-gray-800 max-w-7xl shadow-md p-6 m-4 rounded-xl">
        <span className="text-xl font-bold">
          Welcome Back
        </span>

        <h1 className="text-3xl mt-1">
          Harmony Zawadi
        </h1>
      </header>

      <div className="mt-4 bg-white rounded-xl max-w-7xl mx-4 shadow">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4">

          {/* Progress */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-500">
                Today's Progress
              </h2>

              <SparklesIcon className="w-5 h-5 text-emerald-500" />
            </div>

            <p className="text-3xl font-bold text-gray-800">
              {progress}%
            </p>

            <span className="text-sm text-gray-500">
              {completedHabits} out of {habits.length} done
            </span>
          </div>

          {/* Active Habits */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-500">
                Active Habits
              </h2>

              <CheckCircleIcon className="w-5 h-5 text-blue-500" />
            </div>

            <p className="text-3xl font-bold text-gray-800">
              {habits.length}
            </p>

            <span className="text-sm text-gray-500">
              Habits tracked today
            </span>
          </div>

          {/* Streak */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-500">
                Current Streak
              </h2>

              <FireIcon className="w-5 h-5 text-orange-500" />
            </div>

            <p className="text-3xl font-bold text-gray-800">
              {highestStreak} days
            </p>

            <span className="text-sm text-gray-500">
              Keep the momentum going 🔥
            </span>
          </div>
        </div>

        {/* Habits Section */}
        <div>
          <h2 className="bg-gray-50 p-6 text-emerald-800 tracking-tight font-semibold rounded-t-xl">
            Today's Routine
          </h2>

          <ul className="divide-y divide-gray-100">
            {habits.map((habit) => (
              <li
                key={habit.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition rounded-lg"
              >
                {/* Left Side */}
                <div className="flex items-center gap-4">

                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleComplete(habit.id)}
                    className="transition"
                  >
                    {habit.completed ? (
                      <CheckCircleSolid className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <CheckCircleIcon className="w-6 h-6 text-gray-300 hover:text-emerald-400" />
                    )}
                  </button>

                  {/* Habit Info */}
                  <div className="flex flex-col">
                    <h3
                      className={`font-medium ${
                        habit.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-800"
                      }`}
                    >
                      {habit.name}
                    </h3>

                    <p className="self-start inline-block text-xs text-emerald-700 bg-emerald-100 rounded-full px-2 py-1 mt-1">
                      {habit.category.charAt(0).toUpperCase() +
                        habit.category.slice(1)}
                    </p>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2 text-orange-500">
                  <FireIcon className="w-4 h-4" />

                  <span className="text-sm font-medium">
                    {habit.streak} day
                    {habit.streak !== 1 && "s"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Dashboard;