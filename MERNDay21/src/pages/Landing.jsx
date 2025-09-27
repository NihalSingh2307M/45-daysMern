import React from 'react'
import ContactForm from '../components/ContactForm'
import { assets } from '../assets/assets';

const Landing = () => {
  return (
    <div className='bg-gray-800 w-screen h-screen flex item-center justify-center relative bg-cover bg-center bg-no-repeat ' style={{backgroundImage: `url(${assets.left})`}}>
        <ContactForm/>
    </div>
  )
}

export default Landing
