import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import Allrooms from './Pages/Allrooms'
import RoomDetails from './Pages/RoomDetails'
import Mybookings from './Pages/Mybookings'






function App() {
  const [count, setCount] = useState(0)
  const isOwnerPath = useLocation().pathname.includes("/owner");


  return (
    <div>
       {!isOwnerPath && <Navbar />}
       <div>
          <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rooms' element={<Allrooms />} />
        <Route path='/rooms/:id' element={<RoomDetails />} />
        <Route path='/my-bookings' element={<Mybookings />} />
      </Routes>
       </div>
       <Footer />
    </div>
  )
}

export default App
