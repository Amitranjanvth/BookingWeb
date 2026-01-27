import {assets, facilityIcons, roomsDummyData} from '../assets/assets.js'
import {useSearchParams } from 'react-router-dom'
import StarRating from '../Components/StarRating.jsx'
import { useMemo, useState } from 'react'
import {useAppContext} from '../Context/AppContext.jsx'


const CheckBox = ({label, selected=false, onChange=()=>{}}) => {
  return(
    <label className='flex items-center gap-3 cursor-pointer mt-2 text-sm'>
        <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)} className='w-4 h-4 accent-blue-600' />
         <span className='font-light select-none'>{label}</span>
    </label>
  )
}

const RadioButton = ({label, selected=false, onChange=()=>{}}) => {
  return(
    <label className='flex items-center gap-3 cursor-pointer mt-2 text-sm' >
        <input type="radio" name="sortOptions" checked={selected} onChange={() => onChange(label)} className='w-4 h-4 accent-blue-600' />
        <span className='font-light select-none'>{label}</span>
    </label>
  )
}

const Allrooms = () => {

 
    const [Openfilters, setOpenfilters] = useState(false);
    const [RoomTypes, setRoomTypes] = useState(['Single Room', 'Double Room', 'Suite', 'Deluxe Room']);
    const [priceRanges, setPriceRanges] = useState(['0-100', '101-200', '201-300', '301-400']);
    const [sortOptions, setsortOptions] = useState(['Price: Low to High', 'Price: High to Low', 'Rating: High to Low', 'Rating: Low to High']);

    const [searchParams, setSearchParams] = useSearchParams();
    const {rooms, navigate, currency} = useAppContext()


    const [selectedFilters, setSelectedFilters] = useState({
      RoomTypes : [],
      priceRanges :[]
    })
    const [selectedSort, setSelectedSort] = useState('')

    const handleFilterChange = (checked, value, type) => {
      setSelectedFilters((preFilter) => {
        const updatedFilter = {...preFilter}
        if(checked){
          updatedFilter[type].push(value);

        }else{
          updatedFilter[type] = updatedFilter[type].filter(item => item !== value)
        }
        return updatedFilter
      })
    }

    const handleSortChange = (sortOption) => {
      setSelectedSort(sortOption)
    }

    const matchRoomType = (room) => {
      return selectedFilters.RoomTypes.length === 0 || selectedFilters.RoomTypes.includes(room.RoomTypes)
    }

    const matchPriceRanges = (room) => {
      return selectedFilters.priceRanges.length === 0 || selectedFilters.priceRanges.some(range => {
        const [min, max] = range.split(' to ').map(Number)
        return room.pricePerNight >=min && room.pricePerNight <=max;
      })
    }

    const sortRoom = (a,b) => {
      if(selectedSort === 'price Low to High'){
        return a.pricePerNight - b.pricePerNight
      }
      if(selectedSort === 'price High to Low'){
        return b.pricePerNight - a.pricePerNight
      }
      if(selectedSort === 'NewestFirst'){
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
      return 0;
    }

    const filterDestination = (room) => {
      const destination = searchParams.get('destination')
      if(!destination) return true;
      return room.hotel.city.toLowerCase().includes(destination.toLowerCase())
    }

    const filteredRooms = useMemo(() => {
      return rooms.filter(room => matchRoomType(room) && matchPriceRanges(room) && filterDestination(room)).sort(sortRoom);
    }, [rooms,selectedFilters,selectedSort,searchParams])

    const clearAllFilters = () => {
      setSelectedFilters({
        RoomTypes : [],
        priceRanges : []
      })
      setSelectedSort('');
      setSearchParams({ })
    }

  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      {/* left part */}
  <div>
        <div className='flex flex-col items-start text-left'>
            <h1 className='text-4xl md:text-[40px]'>Wedding Spaces & Packages</h1>
            <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>Carefully selected village venues and local services with exclusive wedding packages to simplify planning</p>
        </div>

      {filteredRooms.slice(0,3).map((room) => (
        
        <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'>
            <img onClick={()=>navigate(`/rooms/${room._id}`)} className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer' src={room.images[0]} alt="" title='view room details' />

            <div className='md:w-1/2 flex-col gap-2'>
                <p className='text-gray-500'>{room.hotel.city}</p>
                <p className='text-gray-800 cursor-pointer text-3xl'>{room.hotel.name}</p>
                <div className='flex items-center pt-2'>
                    <StarRating />
                    <p className='ml-2'>200+ Reviews</p>
                </div>
                <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                    <img src={assets.locationIcon} alt="" />
                    <span>{room.hotel.address}</span>
                </div>
                <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                    {room.amenities.map((item,index) =>(
                        <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                            <img className='w-5 h-5' src={facilityIcons[item]} alt="" />
                            <p className='text-xs'>{item}</p>
                        </div>
                    ))}
                </div>
                <p className='text-xl font-medium text-gray-700'>${room.pricePerNight}/night</p>
            </div>
        </div>    
      ))
    }
  </div>

     {/* right part */}
      <div className='bg-white w-80 border-gray-300 text-gray-600 max-lg:mb-8  min-lg-mt-16'>
        <div className={`flex items-center justify-between px-1.5 py-2.5 border-b border-gray-300 ${Openfilters && 'border-b'}`}>
            <p className='text-base font-medium text-gray-800 '>FILTER</p>
            <div className='text-xs cursor-pointer'>
                <span className='lg:hidden' onClick={()=>setOpenfilters(!Openfilters)}>{Openfilters ? 'Hide' : 'show'}</span>
                <span className='hidden lg:block text-lg text-gray-700'>Clear</span>
            </div>
        </div>
        <div className={` ${Openfilters ? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-700`}>

            <div className='px-5 pt-5'>
              <p className='font-medium text-gray-800 pb-2'>Popular filters</p>
              {RoomTypes.map((room,index) =>(
                <CheckBox selected = {selectedFilters.RoomTypes.includes(room)} onChange={(checked) => handleFilterChange(checked, room, 'RoomTypes')} key={index} label={room} />
              ))}
            </div>

              <div className='px-5 pt-5'>
              <p className='font-medium text-gray-800 pb-2'>Price range</p>
              {priceRanges.map((Range,index) =>(
                <CheckBox selected = {selectedFilters.priceRanges.includes(Range)} onChange={(checked) => handleFilterChange(checked, Range, 'priceRange')} key={index} label={`${currency} ${Range}`} />
              ))}
            </div>

              <div className='px-5 pt-5'>
              <p className='font-medium text-gray-800 pb-2'>sort by</p>
              {sortOptions.map((room,index) =>(
               <RadioButton selected = {selectedSort === Option} onChange={() => handleSortChange(Option)} key={index} label={room} />
              ))}
            </div>

        </div>
        
      </div>
      
    </div>
  )
}

export default Allrooms
