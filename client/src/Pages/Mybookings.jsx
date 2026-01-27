import React, { useEffect } from 'react'
import Title from '../Components/Title'
import {assets, userBookingsDummyData} from '../assets/assets'
import { useState } from 'react'
import { useAppContext } from '../Context/AppContext.jsx'
import toast from 'react-hot-toast'





const Mybookings = () => {
  
  const {axios, getToken, user} = useAppContext()
  const [bookings, setBooking] = useState([]);

  const fetchUserBookings = async() => {
    try {
      const {data} = await axios.get('/api/bookings/user', {headers : {Authorization : `Bearer ${await getToken()}` }})
      if(data.success){
        setBooking(data.bookings)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    if(user){
      fetchUserBookings()
    }
  },[user])


  return (
    <div className='py-28 md:pb-35 md:pt-20 px-4 md:px-16 lg:px-24 xl:px-32'>
      
      <Title title="My Bookings" subtitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks" align='left' />
      
      <div className='max-w-6xl w-full mt-8 text-gray-800'>
        <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
        <div className='w-1/3'>Hotels</div>
        <div className='w-1/3'>Date & Timing</div>
        <div className='w-1/3'>Payments</div>
        </div>
        
        {bookings.map((booking) =>(
          <div key={booking._id} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3 first:border-t'>
            {/* Hotel_Details */}
            <div className='flex flex-col md:flex-row'>
              <img src={booking.room.images[0]} alt="" className='min-md:w-44 rounded shadow object-cover'/>
                <div className='flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4'>
                  <p className='text-2xl'>{booking.hotel.name}
                    <span className='font-inner text-sm'>  ({booking.room.roomType})</span>
                  </p>
                  
                   <div className='flex gap-1 items-center text-sm text-gray-500'>
                      <img src={assets.locationIcon} alt="location-Icon" className='max-md:w-44 rounded shadow object-cover'/>
                    <p>{booking.hotel.address}</p>
                  </div>
                    <div className='flex gap-1 items-center text-sm text-gray-500'>
                      <img src={assets.guestsIcon} alt="guests-Icon" className='max-md:w-44 rounded shadow object-cover'/>
                    <p>Guests: {booking.guests}</p>
                  </div>
                  <p className='text-base'>Total : ${booking.totalPrice}</p>
              </div>
            </div>

            {/* Date & Timing */}
            <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
              <div>
                <p>Check In :</p>
                <p className='text-sm text-gray-500'>{new Date(booking.checkInDate).toDateString()}</p>
              </div>
                <div>
                <p>Check Out :</p>
                <p className='text-sm text-gray-500'>{new Date(booking.checkOutDate).toDateString()}</p>
              </div>

            </div>


            {/* Payments */}
              <div className='flex items-start flex-col justify-center pt-3'>
              <div className='flex items-center gap-2'>
                <div className={`h-3 w-3 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-red-500"}`}></div>
              <p className={`text-sm ${booking.isPaid ? "text-green-500" : "text-red-500"}`}>{booking.isPaid ? "Paid" : "Not Paid"}</p>
              </div>
              {!booking.isPaid && (
                <button className='mt-2 px-4 py-1.5 border border-gray-400 text-gray-800 rounded-full hover:bg-gray-100 transition-all duration-300'>
                  Pay Now
                </button>
              )}

            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default Mybookings
