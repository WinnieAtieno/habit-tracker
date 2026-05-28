import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  UserIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
  EnvelopeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {useAuth} from "../context/AuthContext"
function Auth() {
  const {login} = useAuth()
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Auto-dismiss success alert after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const allUsers = () => {
    try {
      const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
      return savedUsers;
    } catch {
      console.log("something went wrong");
      return [];
    }
  };
  const users = allUsers();

  const message = location.state?.message;
  const from = location.state?.from || "/dashboard";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const email = e.target.email.value;
    const password = e.target.password.value;
    const fullname = e.target.fullname?.value;

    if (!email.trim() || !password.trim()) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // ========================= SIGN UP FLOW =========================
      if (!isLogin) {
        const emailExists = users.some(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (emailExists) {
          setError("An account with this email already exists.");
          setLoading(false);
          return;
        }

        const newUser = { fullname, email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        setLoading(false);
        e.target.reset();

        setSuccess("Account created successfully! Please log in.");
        setIsLogin(true);
        return;
      }

      // ========================= LOGIN FLOW =========================
      const savedUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (savedUser) {
        login("demo-token")
        setLoading(false);
        e.target.reset();
        navigate(from, { replace: true });
      } else {
        setError("Invalid credentials");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white border shadow-sm rounded-2xl p-8">
        
        {/* ================= HEADER ================= */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-tr from-emerald-500 to-orange-400 flex items-center justify-center text-white font-bold">
            H
          </div>
          <h1 className="text-2xl font-bold text-emerald-600 mt-2">HabitFlow</h1>
          <p className="text-sm text-gray-400">
            {isLogin ? "Welcome back" : "Create your account"}
          </p>
        </div>

        {/* ================= REDIRECT MESSAGE ================= */}
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-yellow-100 text-yellow-700 text-sm">
            {message}
          </div>
        )}

        {/* ================= SUCCESS MESSAGE ================= */}
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-100 text-emerald-700 text-sm flex items-center justify-between">
            <span>{success}</span>
            <button type="button" onClick={() => setSuccess("")}>
              <XMarkIcon className="w-4 h-4 text-emerald-600 hover:text-emerald-800" />
            </button>
          </div>
        )}

        {/* ================= ERROR MESSAGE ================= */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button type="button" onClick={() => setError("")}>
              <XMarkIcon className="w-4 h-4 text-red-600 hover:text-red-800" />
            </button>
          </div>
        )}

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="relative">
              <UserIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="fullname"
                placeholder="Full name"
                className="w-full pl-10 pr-3 py-2 border rounded-lg"
                required
              />
            </div>
          )}

          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="relative">
            <LockClosedIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isLogin ? "Logging in..." : "Signing up..."}
              </>
            ) : (
              <>
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                {isLogin ? "Login" : "Sign Up"}
              </>
            )}
          </button>
        </form>

        {/* ================= TOGGLE ================= */}
        <p className="text-sm text-center mt-4 text-gray-500">
          {isLogin ? "No account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setSuccess("");
            }}
            className="text-emerald-600 font-semibold"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>

        {/* ================= HOME LINK ================= */}
        <div className="text-center mt-4">
          <Link to="/" className="text-xs text-gray-400 hover:text-emerald-500">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Auth;
