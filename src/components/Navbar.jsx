import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  HomeIcon,
  Squares2X2Icon,
  PlusCircleIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // High-end, premium Emerald/Orange active state matrix
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md shadow-emerald-600/10 active:scale-[0.98]"
        : "text-slate-600 hover:bg-orange-50/60 border border-transparent hover:border-orange-100 hover:text-emerald-700"
    }`;

  function handleLogout() {
    closeMenu();
    logout();
    navigate("/auth", {
      state: { message: "You have been logged out" }
    });
  }

  return (
    <>
    
      <div className="h-[73px] md:hidden w-full shrink-0" />
  
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 
        w-full md:w-64 md:h-screen 
        bg-white border-b md:border-b-0 md:border-r border-slate-100 
        p-4 md:p-6 flex flex-col justify-between 
        transition-all duration-300 ease-in-out
        ${isOpen ? "h-screen bg-white/95 backdrop-blur-md" : "h-[73px]"}
      `}>
        
        <div className="flex flex-col h-full">
          
          {/* Brand Header Line & Controls */}
          <div className="flex items-center justify-between shrink-0 pb-4 md:pb-6 border-b border-transparent md:border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-orange-500 flex items-center justify-center text-white font-black shadow-sm shadow-emerald-500/10">
                H
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-slate-900 leading-none">HabitFlow</h1>
                <p className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-orange-500 mt-1">Track & Build</p>
              </div>
            </div>

            {/* Mobile View Toggle Switch */}
            <button 
              onClick={toggleMenu} 
              className="md:hidden p-2 text-slate-500 hover:text-emerald-600 hover:bg-orange-50 border border-transparent hover:border-orange-100 rounded-xl transition-all"
              aria-label="Toggle navigation system"
            >
              {isOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
            </button>
          </div>

          {/* Nav Links */}
          <nav className={`
            ${isOpen ? "flex" : "hidden"} 
            md:flex flex-col gap-1.5 flex-1 
            mt-6 overflow-y-auto no-scrollbar
          `}>
            <NavLink to="/" className={linkStyle} onClick={closeMenu}>
              <HomeIcon className="w-4 h-4" />
              Home
            </NavLink>

            <NavLink to="/dashboard" className={linkStyle} onClick={closeMenu}>
              <Squares2X2Icon className="w-4 h-4" />
              Dashboard
            </NavLink>

            <NavLink to="/myhabits" className={linkStyle} onClick={closeMenu}>
              <ClipboardDocumentListIcon className="w-4 h-4" />
              Manage Habits
            </NavLink>

          
            <NavLink to="/add-task" className={linkStyle} onClick={closeMenu}>
              <PlusCircleIcon className="w-4 h-4 text-orange-500 group-hover:text-orange-600" />
              Add Habit
            </NavLink>
          </nav>
        </div>

       
        <div className={`
          ${isOpen ? "flex" : "hidden"} 
          md:flex flex-col gap-1.5 
          border-t border-slate-100 pt-4 mt-auto shrink-0
        `}>
          <NavLink to="/profile" className={linkStyle} onClick={closeMenu}>
            <UserCircleIcon className="w-4 h-4" />
            Profile
          </NavLink>

          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-orange-600 hover:bg-orange-50 border border-transparent hover:border-orange-100 text-left w-full transition-all duration-200"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            Logout
          </button>
        </div>

      </aside>
    </>
  );
}

export default Navbar;
