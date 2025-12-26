import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {assets, facilityIcons, roomsDummyData} from '../assets/assets.js';
import StarRating from '../Components/StarRating.jsx';


const RoomDetails = () => {

    const {id} = useParams();
    const [room, setroom] = useState(null);
    const [mainImage, setmainImage] = useState(null);

    useEffect(() => {
        const room = roomsDummyData.find((room =>room._id === id))
        room && setroom(room);
        room && setmainImage(room.images[0]);
    }, []);

  return room && (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
        <h1 className='text-3xl md:text-4xl font-medium'>{room.hotel.name}
            <span className='text-sm font-inner'>{room.roomType}</span>
        </h1>
        <p className='text-xs py-1.5 px-3 text-white bg-orange-500 rounded-full'>20%OFF</p>
      </div>

    <div className='flex items-center gap-1 mt-2'>
        <StarRating />
        <p className='ml-2'>200+ Reviews</p>
    </div>
    <div className='flex items-center gap-1 mt-2 text-gray-500'>
        <img src={assets.locationIcon} alt="" />
        <p>{room.hotel.address}</p>
    </div>
    <div className='flex flex-col lg:flex-row mt-6 gap-6'>
        <div className='lg:w-1/2 w-full'>
          <img src={mainImage} alt="" className='w-full round-2xl shadow-lg object-cover' />
        </div>

        <div className='lg:w-1/2 w-full grid grid-cols-2 gap-4'>
           {room?.images.length > 1 && room.images.map((image,index) => (
            <img onClick={()=> setmainImage(image)} key={index} src={image} alt="" className={`w-full h-40 object-cover rounded-xl cursor-pointer shadow-md ${mainImage===image && 'outline-2 text-orange-500'}`}/>
           ))}
        </div>
    </div>

        <div className='flex flex-col md:flex-row md:justify-between mt-10'>
            <div className='flex flex-col'>
                <h1 className='text-3xl md:text-4xl font-sans'>Experience Luxury Like Never Before</h1>
                 <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
    {room.amenities.map((item, index) => (
        <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-300'>
            <img src={facilityIcons[item]} alt="" className='w-5 h-5'/>
            <p className='text-xs'>{item}</p>
        </div>
    ))}
</div>
            
            </div>
            <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>

        </div>



           <form className='bg-white mt-5 text-gray-500 rounded-lg px-2 py-4  flex flex-col md:flex-row max-md:items-start gap-6 max-md:mx-auto'>

            <div>
                <div className='flex items-center gap-2'>
                    <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                    </svg>
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                    </svg>
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                    </svg>
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-2 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
                <span>Search</span>
            </button>
        </form>
     </div>


  
  )
}

export default RoomDetails
