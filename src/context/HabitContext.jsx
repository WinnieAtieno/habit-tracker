import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext"; // 🟩 ADDED: Import your authentication hook

const HabitContext = createContext(null);

const STORAGE_KEY = "habits";

export function HabitProvider({ children }) {
  // FETCH LOGGED IN USER DATA
  const { user } = useAuth() || {};
  const currentUserEmail = user?.email; // Use their unique email to group habits

  // Stores ALL raw habits for ALL users in localStorage
  const [allHabits, setAllHabits] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Sync the master state list to localStorage on updates
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allHabits));
  }, [allHabits]);

  // pass habits belonging to the active user down to components
  const habits = allHabits.filter((h) => h.userId === currentUserEmail);

  const addHabit = (habitData) => {
    if (!currentUserEmail) return; // Prevent adding if not logged in

    const newHabit = {
      id: crypto.randomUUID(),
      userId: currentUserEmail, // Link this habit to this user's email
      name: habitData.name,
      category: habitData.category || "general",
      frequency: habitData.frequency || "daily",
      completed: false,
      createdAt: Date.now(),
    };

    setAllHabits((prev) => [newHabit, ...prev]);
  };

  const deleteHabit = (id) => {
    setAllHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const toggleComplete = (id) => {
    setAllHabits((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, completed: !h.completed } : h
      )
    );
  };

  const updateHabit = (id, updatedFields) => {
    setAllHabits((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, ...updatedFields } : h
      )
    );
  };

  return (
    <HabitContext.Provider
      value={{
        habits, 
        addHabit,
        deleteHabit,
        toggleComplete,
        updateHabit, 
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export const useHabits = () => useContext(HabitContext);
