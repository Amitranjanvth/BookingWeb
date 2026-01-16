import React, { useState } from 'react'
import Title from '../../Components/Title';
import {assets} from '../../assets/assets.js';

const AddRoom = () => {

    const [images, setImages] = useState({
        1:null,
        2:null,
        3:null,
        4:null
    });
    const [inputs, setInputs] = useState({
        roomType: '',
        pricePerNight: 0,
        aminities: {'freeWifi': false, 'breakfastIncluded': false, 'airConditioning': false, 'swimmingPool': false},
    });

  return (
    <form>
      <Title title='Add Room' align='left' subtitle='Add a new room to your hotel' />
      <p className='mt-10 text-gray-800'>Images</p>

      <div className='grid-cols-2 sm:flex gap-4 my-2 flex flex-wrap'>
        {Object.keys(images).map((key)=>(
            <label htmlFor={`roomImage${key}`} key={key}>
                <img className='max-h-13 cursor-pointer opacity-80' src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />
                 <input onChange={e=> setImages({...images, [key]: e.target.files[0]})} type="file" accept='image/*' id={`roomImage${key}`} hidden />
            </label>  
        ))}
      </div>

      <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
        <div className='flex flex-1 max-w-48'>
            <p className='text-gray-800 mt-4'>Room Type</p>
            <select onChange={e=>setInputs({...inputs, roomType:e.target.value})} value={inputs.roomType} className='border border-gray-300 opacity-70 mt-1 rounded p-1 w-full'>
                <option value=''>Select Room</option>
                <option value="single Bed">Single Bed</option>
                <option value="Double Bed">Double Bed</option>
                <option value="Luxury rooms">Luxury rooms</option>
                <option value="Famile Suite">Family Suite</option>
            </select>
        </div>
        <div>
            <p className='text-gray-800 mt-4'>Price<span className='text-xs'>/night</span></p>
            <input type="number" onChange={e=>setInputs({...inputs, pricePerNight: e.target.value})} value={inputs.pricePerNight} className='border border-gray-300 opacity-70 mt-1 rounded p-2 w-full' />
        </div>
      </div>

        <p>Aminities</p>
        <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-md'>
            {Object.keys(inputs.aminities).map((e,index) => (
                <div key={index}>
                    <input type="checkbox" id={`aminities ${index+1}`} checked={inputs.aminities[e]} onChange={()=>setInputs({...inputs,aminities: {...inputs.aminities, [e]:!inputs.aminities[e]}})} />
                    <label htmlFor={`aminities ${index+1}`}> {e} </label>
                </div>
            ))}
        </div>

        <button className='bg-blue-500 text-white px-4 py-2 rounded mt-4'>Add Room</button>
    </form>
  )
}

export default AddRoom
