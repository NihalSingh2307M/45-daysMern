import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const LandingPage = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center relative'>

      <img src={assets.imgmain} alt="" className="w-full h-full object-cover" />

      <div className='absolute inset-0 flex flex-col items-center justify-center text-center p-6'>
        
        <div className='font-bold text-6xl mb-6'>
          <Title text1={'Nihal'} text2={'Singh'} />
        </div>

        <p className='text-2xl w-[500px] leading-relaxed font-medium'>
          Curiosity sparks learning; from frontend to backend, database to APIs,
          logic, design, debugging — every step fuels growth.
        </p>
      </div>
    </div>
  )
}

export default LandingPage
