import React from 'react'
import { assets, roomsDummyData } from '../assets/assets'
import Tentcard from './Tentcard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'

const FeaturedDestination = () => {

  const navigate = useNavigate();


  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-10 leading-15 '>
      <Title title='Featured Gaon Wedding Spots' subtitle='The best village wedding venues and local services — trusted, affordable, and easy to plan, all in one place' />
      <div className='flex flex-wrap items-center justify-center gap-8 mt-16'>
        {roomsDummyData.slice(0, 5).map((room, index) => (
            <Tentcard key={room._id} room={room} index={index} />
        ))}
      </div>
        <button onClick={()=>{navigate('/rooms'); scrollTo(0,0)}} className='flex gap-4 rounded-xl my-16 px-4 py-3 text-sm font-medium border border-gray-300 bg-white hover:bg-gray-100 transition-all cursor-pointer'>View All Destinations
          <img src={assets.arrowIcon} alt="" />
        </button>
    </div>
    
  )
}

export default FeaturedDestination
