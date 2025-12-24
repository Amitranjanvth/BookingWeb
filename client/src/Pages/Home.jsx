import React from 'react'
import Hero from '../Components/Hero'
import Testimonial from '../Components/Testimonial'
import Tentcard from '../Components/Tentcard'
import FeaturedDestination from '../Components/FeaturedDestination'
import ExclusiveOffers from '../Components/ExclusiveOffers'
import NewsLetter from '../Components/NewsLetter'

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedDestination />
      <ExclusiveOffers />
      <Testimonial />
      <NewsLetter />
    </div>
  )
}

export default Home
