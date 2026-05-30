import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHabits } from "../context/HabitContext";

import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  FunnelIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

import { habitMeta } from "../utils/habitMeta";
import { filterHabits } from "../utils/habitFilter";

function MyHabits() {
  const { habits = [], deleteHabit } = useHabits(); // Safely default to empty array
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Track which specific habit ID is currently showing the delete confirmation
  const [deletingId, setDeletingId] = useState(null);

  // Safely execute filtering
  const filteredHabits = Array.isArray(habits) ? filterHabits(habits, activeFilter) : [];

  return (
    <div className="max-w-7xl mx-auto space-y-5 pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100">
        <div>
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            My List
          </p>
          <h1 className="text-2xl font-extrabold text-slate-900">
            All Habits
          </h1>
        </div>

        <Link
          to="/add-task"
          className="bg-slate-900 text-white px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          Create Habit
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 bg-white p-3 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 pr-2 border-r">
          <FunnelIcon className="w-4 h-4" />
          Category
        </div>

        {["all", "general", "work", "health", "personal"].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize ${
              activeFilter === f
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-slate-100">
        {filteredHabits.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            No habits found
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {filteredHabits.map((habit, index) => {
              const meta = habitMeta[habit.category] || habitMeta.general;
              const Icon = meta.icon;
              // Safely look up IDs fallback to map index to ensure stable rendering loops
              const currentId = habit.id || index;
              const isConfirmingDelete = deletingId === currentId;

              return (
                <li
                  key={currentId}
                  className="flex items-center justify-between p-4 hover:bg-slate-50"
                >
                  {/* Left */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg ${meta.styles}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <h3
                        className={`text-sm truncate ${
                          habit.completed
                            ? "line-through text-slate-400"
                            : "text-slate-800 font-semibold"
                        }`}
                      >
                        {habit.name}
                      </h3>

                      <p className="text-[10px] text-slate-400 capitalize">
                        {habit.category}
                      </p>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="flex items-center gap-2">
                    {isConfirmingDelete ? (
                      // Inline Delete Confirmation State
                      <div className="flex items-center gap-1 bg-rose-50 p-1 rounded-xl border border-rose-100">
                        <span className="text-[10px] font-bold text-rose-700 px-2">
                          Delete?
                        </span>
                        
                        {/* Confirm button */}
                        <button
                          onClick={() => {
                            deleteHabit(currentId);
                            setDeletingId(null);
                          }}
                          className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition"
                          title="Confirm Delete"
                        >
                          <CheckIcon className="w-3.5 h-3.5" />
                        </button>

                        {/* Cancel button */}
                        <button
                          onClick={() => setDeletingId(null)}
                          className="p-1.5 rounded-lg bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 transition"
                          title="Cancel"
                        >
                          <XMarkIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      // Standard View (Edit & Initial Delete Trigger)
                      <>
                       
                        <Link
                          to={`/edit/${currentId}`}
                          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition"
                          title="Edit Habit"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => setDeletingId(currentId)}
                          className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition"
                          title="Delete Habit"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyHabits;
