import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'

import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { HabitProvider } from './context/HabitContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HabitProvider>
       <RouterProvider router={router}/> 
      </HabitProvider>
    </AuthProvider>
  </StrictMode>,
)
