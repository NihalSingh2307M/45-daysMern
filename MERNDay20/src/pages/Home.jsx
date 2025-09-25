import React from 'react'
import ProjectCard from '../components/ProjectCard'
import { assets } from '../assets/assets'

const Home = () => {
  return (
    <div className='w-screenmin-h-screen relative flex flex-col items-center justify-center '>
        <img src={assets.main} alt="" className='object-cover w-full h-screen absolute' />
      <div className='z-10 w-full h-screen'>
        <ProjectCard
            title={'Portfolio Website'}
            description={'A personal website to showcase my projects and skills'}
        />
        <ProjectCard
            title={'Portfolio Website 1'}
            description={'A personal website to showcase my projects and skills 1'}
        />
        <ProjectCard
            title={'Portfolio Website 3'}
            description={'A personal website to showcase my projects and skills 2'}
        />
      </div>
    </div>
  )
}

export default Home