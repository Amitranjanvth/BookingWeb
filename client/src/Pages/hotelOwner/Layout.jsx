import React from 'react'
import Navbar from '../../Components/hotelOwner/Navbar.jsx';
import Sidebar from '../../Components/hotelOwner/Sidebar.jsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className='flex h-full'>
        <Sidebar/>
        <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
            <Outlet/>
        </div>

      </div>
    </div>
  )
}

export default Layout
