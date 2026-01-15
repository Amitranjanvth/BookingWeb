import React from 'react'
import {assets} from '../../assets/assets.js';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  const SidebarLinks = [
    { name: 'Dashboard', path: '/owner', icon: assets.dashboardIcon },
    { name: 'Add Rooms', path: '/owner/add-room', icon: assets.addIcon },
    { name: 'List-rooms', path: '/owner/list-room', icon: assets.listIcon}
  ];

  return (
    <div className='md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex-col transition-all duration-300'>
      
      {SidebarLinks.map((link) => (
        <NavLink to={link.path} key={link.name} className={({ isActive }) => isActive ? 'flex items-center gap-3 px-4 py-3 bg-gray-200 text-gray-900 font-medium' : 'flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900'}>
          <img src={link.icon} alt={link.name} className='h-5 w-5'/>
          <span className='hidden md:inline'>{link.name}</span>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar

