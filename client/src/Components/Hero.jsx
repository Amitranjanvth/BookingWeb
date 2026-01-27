import React from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../Context/AppContext.jsx'
import { useState } from 'react';

const Hero = () => {

        const {navigate, getToken, axios, setSearchCities} = useAppContext();
        const [destination, setDestination] = useState('')
        const onSearch = async (e) => {
                e.preventDefault();
                navigate(`/rooms?destination=${destination}`)
                await axios.post('/api/user/store-recent-search', {recentSearchedCities : destination},{headers : {Authorization : `Bearer ${await getToken()}` }} )
                setSearchCities((prevSearch) => {
                        const updatedSearchCities = [...prevSearch, destination]
                        if(updatedSearchCities.length > 3){
                                updatedSearchCities.shift();
                        }
                        return updatedSearchCities
                })
        }
return (
    <div className='flex flex-col items-start justify-center px-6 md:px-1 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/wedding-785840_1920.jpg")] bg-no-repeat bg-cover bg-center h-screen brightness-80'>
        
        <p className='px-4 py-2 rounded-full mt-20 bg-cyan-100 text-black text-lg'>Rooted Village Events</p>

        <h1 className='font-playfair text-xl md:text-5xl xl:text-[56px] md:leading-56px font-bold md:font-extrabold max-w-3xl mt-3 bg-gradient-to-r from-purple-400 via-pink-300 to-red-500 bg-clip-text text-transparent'>Welcome To EVENTWALLAH</h1>

        <p className='max-w-3xl mt-2 text-xl font-bold md:text-2xl bg-gradient-to-r text-black '>Gaon ka andaaz shehar ka experience - EVENTWALLAH ke sath</p>

            <form onSubmit={onSearch} className='bg-white text-gray-500 rounded-lg px-6 py-5  flex flex-col md:flex-row z-10 max-md:items-start gap-4 max-md:mx-auto mt-18 md:place-self-end-safe shadow-lg hover:shadow-orange-300 transition-all'>

                    <div>
                            <div className='flex items-center gap-2'>
                                 <img src={assets.calenderIcon} alt="" className='h-4'/>
                                    <label htmlFor="destinationInput">Destination</label>
                            </div>
                            <datalist id='destinationInput'>
                                {cities.map((city, index) => (
                                    <option key={index} value={city} />
                                ))  }
                            </datalist>
                            <input onChange={(e) => setDestination(e.target.value)} value={destination} list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                    </div>

                    <div>
                            <div className='flex items-center gap-2'>
                                    <img src={assets.calenderIcon} alt="" className='h-4'/>
                                    <label htmlFor="checkIn">Check in</label>
                            </div>
                            <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
                    </div>

                    <div>
                            <div className='flex items-center gap-2'>
                                        <img src={assets.calenderIcon} alt="" className='h-4'/>
                                    <label htmlFor="checkOut">Check out</label>
                            </div>
                            <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
                    </div>

                    <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                            <label htmlFor="guests">Guests</label>
                            <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
                    </div>

                    <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                            <img src={assets.searchIcon} alt="" className='h-7'/>
                            <span>Search</span>
                    </button>
            </form>
    </div>
)
}

export default Hero
