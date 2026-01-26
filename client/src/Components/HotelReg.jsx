import React, { useState } from 'react'
import {assets, cities} from '../assets/assets.js';
import { useAppContext } from '../Context/AppContext.jsx';
import toast from 'react-hot-toast';

const HotelReg = () => {


  const [name, SetName] = useState("");
  const [address, SetAddress] = useState("");
  const [contact, SetContact] = useState("");
  const [city, SetCity] = useState("");
  const {setShowHotelReg, axios, getToken, setIsOwner} = useAppContext();

  const onSubmitHandler = async(event) => {
    try {
      event.preventdeafult();
      const {data} = await axios.post(`/api/hotels/`, {name,contact,address,city}, {headers :{Authorization : `Bearer ${await getToken()}`}})
      if(data.success){
        toast.success(data.message);
        setIsOwner(true);
        setShowHotelReg(false);
      }else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  } 

  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 z-100 flex items-center justify-center bg-black/70'>
      <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>
        <img src={assets.regImage} alt="regImage" className='w-1/2 rounded-xl hidden md:block' />
        <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
            <img onClick={() => setShowHotelReg(false)} src={assets.closeIcon} alt="closeIcon" className='absolute top-4 right-4 w-4 cursor-pointer' />
            <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p> 

            <div className='w-full mt-4'>
                <label htmlFor="name" className='font-medium text-gray-500'>Hotel Name</label>
                <input onChange={(e) => SetName(e.target.value)} value={name} type="text" id="name"  placeholder='Enter hotel name' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light ' required />
            </div>

              <div className='w-full mt-4'>
                <label htmlFor="phone" className='font-medium text-gray-500'>Phone</label>
                <input onChange={(e) => SetContact(e.target.value)} value={contact} type="text" id="phone"  placeholder='Enter hotel name' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light ' required />
            </div>

              <div className='w-full mt-4'>
                <label htmlFor="address" className='font-medium text-gray-500'>Address</label>
                <input onChange={(e) => SetAddress(e.target.value)} value={address} type="text" id="address"  placeholder='Enter hotel name' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light ' required />
            </div>

            <div className='w-full mr-auto max-w-60 mt-4'>
                <label htmlFor="city" className='font-medium text-gray-500 '>City</label>
                <select onChange={(e) => SetCity(e.target.value)} value={city} id='city' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required >
                    <option value="" >Select City</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city}>{city}</option>
                    ))}

                </select>
            </div>
                
            <button type='submit' className='bg-indigo-500 hover:bg-indigo-600/70 hover:rounded-xl text-white font-medium rounded px-6 py-2.5 mt-6'>Register Hotel</button>
        </div>
    
      </form>
    </div>
  )
}

export default HotelReg
