import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHabits } from "../context/HabitContext";
import CategorySelector from "../components/CategorySelector";
import FrequencySelector from "../components/FrequencySelector";
import SuccessModal from "../components/SuccessModal";
import { PlusCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function AddTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { habits, addHabit, updateHabit } = useHabits();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    category: "general",
    frequency: "daily",
    notes: ""
  });

  
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(3); 
  const timerRef = useRef(null);

  
  useEffect(() => {
    if (isEditMode && habits) {
      const existingHabit = habits.find((h) => String(h.id) === String(id));
      if (existingHabit) {
        setFormData({
          name: existingHabit.name,
          category: existingHabit.category || "general",
          frequency: existingHabit.frequency || "daily",
          notes: existingHabit.notes || ""
        });
      } else {
        // Fallback if record ID isn't found in memory context
        setErrorMessage("Requested habit was not found.");
      }
    }
  }, [id, isEditMode, habits]);

  // Automated Countdown Redirect Loop
  useEffect(() => {
    if (showModal) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            navigate("/dashboard"); 
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [showModal, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    
    const cleanedName = formData.name.trim();
    if (!cleanedName) {
      setErrorMessage("Habit name cannot be blank.");
      return;
    }

    
    if (cleanedName.length < 3) {
      setErrorMessage("Habit name must be at least 3 characters long.");
      return;
    }

    if (cleanedName.length > 50) {
      setErrorMessage("Habit name cannot exceed 50 characters.");
      return;
    }

    const compiledData = {
      ...formData,
      name: cleanedName,
      notes: formData.notes.trim()
    };

    if (isEditMode) {
      updateHabit(id, compiledData);
    } else {
      addHabit(compiledData);
    }

    setFormData({
      name: "",
      category: "general",
      frequency: "daily",
      notes: ""
    });
    
    setShowModal(true);  
  };

  const handleManualRedirect = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12 relative">      
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-800 transition"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          {isEditMode ? "Edit Habit" : "Create New Habit"}
        </h1>
        <p className="text-sm text-slate-500 mt-1">Set up your new daily or weekly routine goals to stay on track.</p>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 space-y-6">
        
        {/* Error Alert Display Row */}
        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-xs font-bold text-rose-600 tracking-wide uppercase">
            {errorMessage}
          </div>
        )}

        {/* Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Habit Name
          </label>
          <input
            type="text"
            placeholder="e.g., Read a book,  Go to the gym,  Drink more water"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder-slate-400 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-medium"
          />
        </div>

        {/* Category Selector Grid */}
        <CategorySelector
          selectedCategory={formData.category}
          onSelect={(category) => setFormData({ ...formData, category })}
        />

        {/* Frequency Toggles */}
        <FrequencySelector
          value={formData.frequency}
          onChange={(frequency) => setFormData({ ...formData, frequency })}
        />

        {/* Notes Textarea */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Extra Notes <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            rows="3"
            placeholder="Add a small description or reminders for yourself here..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder-slate-400 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-medium resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button" // Fixed syntax typo here
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] shadow-sm flex items-center gap-2 transition-all"
          >
            <PlusCircleIcon className="w-4 h-4" />
            {isEditMode ? "Save Changes" : "Add Habit"}
          </button>
        </div>
      </form>

      {/* AUTOMATED REDIRECT MODAL */}
      {showModal && (
        <SuccessModal
          isEditMode={isEditMode}
          countdown={countdown}
          onGoNow={handleManualRedirect}
        />
      )}

    </div>
  );
}

export default AddTask;
