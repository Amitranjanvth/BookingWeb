import React from 'react'
import Title from './Title'
import { assets, exclusiveOffers } from '../assets/assets'

const ExclusiveOffers = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30'>
      <div className='flex flex-col md:flex-row items-center justify-between w-full'>
        <Title title='Exclusive Offers' subtitle='fhhvjkfdjfsdfdasfj' align='left'  />
        <button className='group flex-1 items-center gap-2 font-medium cursor-pointer max-md:mt-12'>View all Offers 
            <img className='group-hover:translate-x-1 transition-all' src={assets.arrowIcon} alt="" />
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
        {exclusiveOffers.map((item) =>
            (<div key={item._id} className='group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-center bg-cover' style={{backgroundImage: `url(${item.image})`}}> 

            <p className='px-3 py-1 absolute top-4 left-4 text-xl bg-white text-gray-800 font-medium rounded-full'>{item.priceOff}%OFF</p>

            <div className='grid grid-col-1 md:grid-col-2 xl:grid-col-3 gap-6 mt-12'>
                <p className='text-2xl font-medium font-PlayFair'>{item.title}</p>
                <p>{item.description}</p>
                <p className='text-xl text-white/70 mt-3'>Expires {item.expiryDate}</p>
            </div>
            <button className='flex items-center gap-2 font-medium cursor-pointermt-4 mb-5'>
            View all Offers 
            <img className='group-hover:translate-x-1 transition-all' src={assets.arrowIcon} alt="" />
        </button>

        </div>))}


      </div>
    </div>
  )
}

export default ExclusiveOffers
