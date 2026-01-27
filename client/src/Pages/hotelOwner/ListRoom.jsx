import React, { useEffect } from 'react'
import {assets} from '../../assets/assets.js';
import Title from '../../Components/Title.jsx';
import { useState } from 'react';
import {useAppContext} from '../../Context/AppContext.jsx'
import toast from 'react-hot-toast';

const ListRoom = () => {

    const {user, getToken, axios} = useAppContext();
    const [rooms, setRooms] = useState([]);




//     const toggleAvailability = (index) => {
//   const updatedRooms = rooms.map((room, i) =>
//     i === index
//       ? { ...room, isAvailable: !room.isAvailable }
//       : room
//   );
//   setRooms(updatedRooms);
// };

      const fetchRoom = async () =>{
      try {
        const {data} = await axios.get('/api/rooms/owner',{headers : {Authorization : `Bearer ${await getToken()}` }})
        if(data.success){
          setRooms(data.rooms);
        }else{
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    useEffect(()=> {
      if(user){
        fetchRoom();
      }
    },[user])

    const toggleAvailability = async(roomId) => {
      try {
        const {data} = await axios.post('/api/rooms/toggle-availability', {roomId}, {headers : {Authorization : `Bearer ${await getToken()}` }})
        if(data.success){
          toast.message(data.message);
          fetchRoom()
        }else{
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }


  return (
    <div>
      <Title align="left" title="List of Rooms" subtitle="Manage your hotel rooms" />
       <p className='text-gray-800 mt-8'>All Rooms</p>

         <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
        <table className='w-full'>
            <thead className='bg-gray-50'>
                <tr>
                    <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
                    <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
                    <th className='py-3 px-4 text-gray-800 font-medium'>Price per Night</th>
                    <th className='py-3 px-4 text-gray-800 font-medium text-center'>Action</th>
                </tr>
            </thead>
            <tbody className='text-sm'>
                {rooms.map((room, index) => (
                    <tr key={index}>
                        <td className='px-3 py-4 text-gray-700 border-t border-gray-300 '>{room.roomType}</td>
                        <td className='px-3 py-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>{room.amenities.join(',')}</td>
                        <td className='px-3 py-4 text-gray-700 border-t border-gray-300 '>${room.pricePerNight}</td>
                       <td className='px-3 py-4 text-gray-700 border-t border-gray-300 '>
                         <label htmlFor={`room-${index}`} className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                            <input  onChange={() => toggleAvailability(item._id)} type="checkbox" id={`room-${index}`} className='sr-only peer' checked={room.isAvailable} />
                            <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'></div>
                            <span className='absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
                        </label>
                       </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>


    </div>
  )
}

export default ListRoom
