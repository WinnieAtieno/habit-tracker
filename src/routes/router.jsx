import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Auth from "../pages/Auth";
import Layout from "../components/Layout";
import Protected from "../components/Protected";
import Profile from "../pages/Profile";
import AddTask from "../pages/AddTask";
import MyHabits from "../pages/MyHabits";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Main master app layout skeleton
    children: [
      // ==================== PUBLIC ROUTES ====================
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      
      // ==================== PRIVATE ROUTES ====================
      {
        element: <Protected />, // Guards all children listed below
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },         
          {
            path: "myhabits",
            element: <MyHabits />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "add-task",
            element: <AddTask />,
          },
          {
            path: "edit/:id",
            element: <AddTask />,
          },
        ],
      },
    ],
  },
]);

export default router;
