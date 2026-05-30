import { CheckIcon } from "@heroicons/react/24/outline";

function SuccessModal({
  isEditMode,
  countdown,
  onGoNow,
}) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white max-w-sm w-full p-6 rounded-2xl shadow-xl text-center space-y-4 overflow-hidden relative">

        {/* Icon */}
        <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-500 shadow-sm">
          <CheckIcon className="w-6 h-6 stroke-[2.5]" />
        </div>

        {/* Text */}
        <div className="space-y-1">
          <h3 className="text-base font-extrabold text-slate-900">
            {isEditMode
              ? "Habit Updated!"
              : "Habit Created!"}
          </h3>

          <p className="text-xs text-slate-400 font-medium leading-relaxed px-2">
            Taking you back in{" "}
            <span className="text-slate-900 font-extrabold tabular-nums">
              {countdown}s
            </span>
            ...
          </p>
        </div>

        {/* Button */}
        <button
          onClick={onGoNow}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-sm active:scale-95"
        >
          Go Now
        </button>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
          <div
            style={{
              width: `${(countdown / 3) * 100}%`,
            }}
            className="h-full bg-emerald-500 transition-all duration-1000 ease-linear"
          />
        </div>

      </div>
    </div>
  );
}

export default SuccessModal;