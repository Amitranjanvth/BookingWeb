import React from 'react'
import Title from './Title'
import { assets, exclusiveOffers } from '../assets/assets'

const ExclusiveOffers = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30'>
      <div className='flex flex-col md:flex-row items-center justify-between w-full'>
        <Title title='Special Wedding Packages' subtitle='Handpicked local packages and limited-time offers to plan a seamless and unforgettable village wedding experience.' align='left' />
        <button className='group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12'>
          View all Offers 
          <img className='group-hover:translate-x-1 transition-all' src={assets.arrowIcon} alt="" />
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
        {exclusiveOffers.map((item) => (
          <div key={item._id} className='group relative flex flex-col items-start justify-between gap-4 pt-12 md:pt-18 px-4 pb-4 rounded-xl text-white bg-no-repeat bg-center bg-cover' style={{backgroundImage: `url(${item.image})`}}>
            <p className='px-3 py-1 absolute top-4 left-4 text-xl bg-white text-gray-800 font-medium rounded-full'>{item.priceOff}% OFF</p>
            
            <div className='flex flex-col gap-2 mt-12'>
              <p className='text-2xl font-medium font-PlayFair'>{item.title}</p>
              <p className='text-sm'>{item.description}</p>
              <p className='text-lg text-white/70 mt-2'>Expires {item.expiryDate}</p>
            </div>
            
            <button className='flex items-center gap-2 font-medium cursor-pointer mt-auto'>
              <p>View Offer</p> 
              <img className='group-hover:translate-x-1 transition-all' src={assets.arrowIcon} alt="" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExclusiveOffers
