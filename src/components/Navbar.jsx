import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  Squares2X2Icon,
  PlusCircleIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

function Navbar() {
  const [isActive, setIsActve] = useState(false)

  const hadleClick = ()=>!setIsActve

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-emerald-500 text-white"
        : "text-gray-700 hover:bg-orange-100 hover:text-emerald-600"
    }`;
 function handleLogout(){
  localStorage.removeItem("token")
  navigate("/auth", {
    state:{
      message:"You have been looged out"
    }
  })
 }
    

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-5 flex flex-col">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-orange-400 flex items-center justify-center text-white font-bold">
            H
          </div>
          <h1 className="text-2xl font-bold text-emerald-600">HabitFlow</h1>
        </div>
        <p className="text-sm text-gray-400 mt-1">Track. Build. Improve.</p>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        <NavLink to="/" className={linkStyle} onClick={hadleClick}>
          <HomeIcon className="w-5 h-5" />
          Home
        </NavLink>

        <NavLink to="/dashboard" className={linkStyle} onClick={hadleClick}>
          <Squares2X2Icon className="w-5 h-5" />
          Dashboard
        </NavLink>

        <NavLink to="/myhabits" className={linkStyle} onClick={hadleClick}>
          <ClipboardDocumentListIcon className="w-5 h-5" />
          My Habits
        </NavLink>

        <NavLink to="/add-task" className={linkStyle} onClick={hadleClick}>
          <PlusCircleIcon className="w-5 h-5 text-orange-500" />
          Add Task
        </NavLink>

        <NavLink to="/analytics" className={linkStyle} onClick={hadleClick}>
          <ChartBarIcon className="w-5 h-5" />
          Analytics
        </NavLink>

        <NavLink to="/settings" className={linkStyle} onClick={hadleClick}>
          <Cog6ToothIcon className="w-5 h-5" />
          Settings
        </NavLink>

        <div className="mt-auto border-t pt-4 flex flex-col gap-2">
          <NavLink to="/profile" className={linkStyle}>
            <UserCircleIcon className="w-5 h-5" />
            Profile
          </NavLink>

          <NavLink to="/auth" className={linkStyle} onClick={handleLogout}>
            <ArrowRightOnRectangleIcon className="w-5 h-5 text-orange-500" />
            Logout
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}

export default Navbar;