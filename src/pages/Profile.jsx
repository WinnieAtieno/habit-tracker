import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  UserIcon, 
  EnvelopeIcon, 
  CalendarIcon, 
  ArrowLeftOnRectangleIcon 
} from "@heroicons/react/24/outline";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  // Safe fallback states if user profile sync finishes loading late
  const profileName = user?.name || "HabitFlow User";
  const profileEmail = user?.email || "No email linked";
  const profileJoined = user?.joinedDate || "Recent Member";

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      
      {/* Page Header */}
      <div>
        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">DETAILS</p>
        <h1 className="text-2xl font-extrabold text-slate-900">User Profile</h1>
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        
        {/* Banner Accent Graphic */}
        <div className="h-24 bg-gradient-to-r from-emerald-500 to-teal-600" />

        {/* Profile Details Area */}
        <div className="p-6 relative pt-0">
          
          {/* Avatar Icon */}
          <div className="w-20 h-20 bg-slate-100 rounded-2xl border-4 border-white shadow-sm flex items-center justify-center text-slate-500 absolute -top-10 left-6">
            <UserIcon className="w-10 h-10" />
          </div>

          {/* User Name Info */}
          <div className="pl-28 pt-3 min-h-[40px]">
            <h2 className="text-lg font-bold text-slate-800">{profileName}</h2>
            <p className="text-xs text-slate-400 font-medium">Account Active</p>
          </div>

          {/* Metadata Grid Fields */}
          <div className="mt-8 space-y-4 border-t border-slate-100 pt-6">
            
            {/* Email Row */}
            <div className="flex items-center gap-3 text-slate-600">
              <EnvelopeIcon className="w-5 h-5 text-slate-400" />
              <div className="text-sm">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Email Address</p>
                <p className="font-semibold text-slate-700 mt-1">{profileEmail}</p>
              </div>
            </div>

            {/* Registration Date Row */}
            <div className="flex items-center gap-3 text-slate-600">
              <CalendarIcon className="w-5 h-5 text-slate-400" />
              <div className="text-sm">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Member Since</p>
                <p className="font-semibold text-slate-700 mt-1">{profileJoined}</p>
              </div>
            </div>

          </div>

          {/* Account Actions Area */}
          <div className="mt-8 border-t border-slate-100 pt-6 flex justify-end">
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 flex items-center gap-2 transition-all"
            >
              <ArrowLeftOnRectangleIcon className="w-4 h-4" />
              Sign Out Account
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Profile;
