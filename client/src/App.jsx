import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Footer from './Components/Footer'





function App() {
  const [count, setCount] = useState(0)
  const isOwnerPath = useLocation().pathname.includes("/owner");

  return (
    <div>
       {!isOwnerPath && <Navbar />}
       <div>
          <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
       </div>
       <Footer />
    </div>
  )
}

export default App
