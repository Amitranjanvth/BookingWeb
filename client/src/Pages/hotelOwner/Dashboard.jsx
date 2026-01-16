import React, { useState } from 'react'
import Title from '../../Components/Title'
import {assets, dashboardDummyData} from '../../assets/assets.js';

const Dashboard = () => {

    const [DashboardData, setDashboardData] = useState(dashboardDummyData);


  return (
    <div>
      <Title align='left' font='outfit' title='Dashboard' subtitle='Welcome to your dashboard' />
      <div className='flex gap-4 my-8'>

        <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
            <img src={assets.totalBookingIcon} alt="totalbookingIcon" className='max-sm:hidden h-10'/>
            <div className='flex flex-col sm:ml-4 font-medium'>
                <p className='text-neutral-500 text-lg'>Total Bookings</p>
                <p className='text-neutral-400 text-base'>{DashboardData.totalBookings}</p>
            </div>
        </div>

                <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
            <img src={assets.totalRevenueIcon} alt="totalrevenueIcon" className='max-sm:hidden h-10'/>
            <div className='flex flex-col sm:ml-4 font-medium'>
                <p className='text-neutral-500 text-lg'>Total Revenue</p>
                <p className='text-neutral-400 text-base'>{DashboardData.totalRevenue}</p>
            </div>
        </div>
      </div>

      <h2 className='text-xl text-blue-950/70 font-medium mb-5 '>Recent Bookings</h2>
      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
        <table className='w-full'>
            <thead className='bg-gray-50'>
                <tr>
                    <th className='py-3 px-4 text-gray-800 font-medium'>User Name</th>
                    <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Room Name</th>
                    <th className='py-3 px-4 text-gray-800 font-medium text-center'>Total Amount</th>
                    <th className='py-3 px-4 text-gray-800 font-medium text-center'>Payment Status</th>
                </tr>
            </thead>
            <tbody className='text-sm'>
                {DashboardData.bookings.map((item,index) => (
                    <tr key={index}>
                        <td className='px-3 py-4 text-gray-700 border-t border-gray-300 '>{item.user.username}</td>
                        <td className='px-3 py-4 text-gray-700 border-t border-gray-300 '>{item.room.roomType}</td>
                        <td className='px-3 py-4 text-gray-700 border-t border-gray-300 text-center '>{item.totalPrice}</td>

                        <td className='px-3 py-4 border-t border-gray-300 text-center '>
                            {item.isPaid ? (
                                <span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold'>Paid</span>
                            ) : (
                                <span className='bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold'>Pending</span>
                            )}  
                        </td>
                    </tr>
                    
                ))}
            </tbody>

        </table>

      </div>
    </div>
  )
}

export default Dashboard
