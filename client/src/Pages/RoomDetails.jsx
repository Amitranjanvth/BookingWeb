import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {assets, facilityIcons, roomCommonData} from '../assets/assets.js';
import StarRating from '../Components/StarRating.jsx';
import { useAppContext } from '../Context/AppContext.jsx'
import toast, { CheckmarkIcon } from 'react-hot-toast';


const RoomDetails = () => {

    const {id} = useParams();
    const {rooms, getToken, axios, navigate} = useAppContext();
    const [room, setroom] = useState(null);
    const [mainImage, setmainImage] = useState(null);

    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [guests, setGuests] = useState(1);
    const[isAvailable, setIsAvailable] = useState(false);

    const checkAvailability = async() => {
        try {
            if(checkInDate >= checkOutDate){
                toast.error("You Entered wrong Date");
                return
            }
            const {data} = await axios.post('/api/bokkings/check-availability', {room: id, checkInDate, checkOutDate})
            if(data.success){
                if(data.isAvailable){
                    setIsAvailable(true);
                    toast.success("Room is Available...")
                }else{
                    setIsAvailable(false)
                    toast.error("Room is Not Available");
                }
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const onSubmitHandler = async(e) => {
        try {
            e.preventDefault();
            if(!isAvailable){
                return checkAvailability();
            }else{
                const {data} = await axios.post('/api/bookings/book', {room: id, checkInDate, checkOutDate, guests, paymentMethod: 'Pay At Hotel'}, {headers : {Authorization : `Bearer ${await getToken()}` }})
                if(data.success){
                    toast.message(data.message)
                    navigate('/my-bookings')
                    scrollTo(0,0)
                }else{
                    toast.error(data.message)
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const room = rooms.find((room =>room._id === id))
        room && setroom(room);
        room && setmainImage(room.images[0]);
    }, [rooms]);

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



           <form onSubmit={onSubmitHandler} className='bg-white mt-5 text-gray-500 rounded-lg px-2 py-4  flex flex-col md:flex-row max-md:items-start gap-6 max-md:mx-auto'>

            <div>
                <div className='flex items-center gap-2'>
                    <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                    </svg>
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input  list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                    </svg>
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input onChange={(e) => setCheckInDate(e.target.value)} min={new Date().toISOString().split('T')[0]}  id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                    </svg>
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input onChange={(e) => setCheckOutDate(e.target.value)} min={checkInDate} disabled={checkInDate} id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input onChange={(e) => setGuests(e.target.value)} value={guests} min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-2 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
                <span>Search</span>
            </button>
        </form>

        <div className='mt-25 space-y-4'>
            {roomCommonData.map((data, index) => (
                <div key={index} className='flex items-start gap-2'>
                    <img className='w-6' src={data.icon} alt={data.title} />
                    <div>
                    <h2 className='text-xl font-medium mb-2'>{data.title}</h2>
                    <p className='text-gray-500'>{data.description}</p>
                    </div>
                </div>
            ))}

        </div>
        <div className='max-w-3xl border-y-2 py-3 border-gray-300 text-gray-500 mt-5'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore rerum soluta corrupti? Autem a, nesciunt voluptates saepe magnam earum mollitia perferendis eaque hic distinctio necessitatibus laudantium dolor obcaecati, enim non quo omnis fugit pariatur tenetur ullam neque explicabo dolore ad?</p>
        </div>
        <div className='flex flex-col items-start gap-4'>
            <div className='gap-4'>
                <img className='h-14 w-14 md:h-18 md:w-18 rounded-full' src={room.hotel.owner.image} alt="owner_image" />
                <div>
                    <p className='text-lg md:text-xl'>{room.hotel.name}</p>
                    <div className='mt-1 flex items-start'>
                        <StarRating />
                        <p className='ml-2 text-sm'>200+ Reviews</p>
                    </div>
                </div>
            </div>
                <button className='px-6 py-2.5 mt-4 rounded transition-all cursor-pointer bg-blue-300 hover:bg-amber-400 hover:rounded-full'>{isAvailable ? "Book Now" : "Check Availability"}</button>
        </div>
     </div>


  
  )
}

export default RoomDetails
