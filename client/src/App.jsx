import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'





function App() {
  const [count, setCount] = useState(0)
  const isOwnerPath = useLocation().pathname.includes("/owner");

  return (
    <div>
       {!isOwnerPath && <Navbar />}
    </div>
  )
}

export default App
