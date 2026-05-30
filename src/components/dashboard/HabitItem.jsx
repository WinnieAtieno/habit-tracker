import {
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

import {
  CheckCircleIcon as CheckCircleSolid,
} from "@heroicons/react/24/solid";

import { habitMeta } from "../../utils/habitMeta";

export default function HabitItem({ habit, toggleComplete }) {
  return (
    <li className="group bg-white border border-slate-100 rounded-xl px-4 py-3 hover:bg-slate-50 transition">

      <div className="flex items-center justify-between gap-3">

        {/* LEFT */}
        <div className="flex items-center gap-3 min-w-0">

          <button
            onClick={() => toggleComplete(habit.id)}
            className="shrink-0 active:scale-90 transition"
          >
            {habit.completed ? (
              <CheckCircleSolid className="w-6 h-6 text-emerald-500" />
            ) : (
              <CheckCircleIcon className="w-6 h-6 text-slate-300 hover:text-emerald-400" />
            )}
          </button>

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

            <span
              className={`inline-flex mt-1 text-[10px] font-bold capitalize px-2 py-1 rounded-md border ${
                habitMeta[habit.category]?.styles ||
                "bg-slate-50 text-slate-600 border-slate-100"
              }`}
            >
              {habit.category}
            </span>
          </div>

        </div>

      </div>

    </li>
  );
}