import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='flex flex-col min-h-screen md:h-screen md:flex-row overflow-hidden'>
      <Navbar />
      <main className='flex-1 p-6 bg-gray-100 overflow-y-auto w-full'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
