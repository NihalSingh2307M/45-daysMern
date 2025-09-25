import React from 'react'

const ProjectCard = ({ title,description}) => {
  return (
    <div className='w-full  p-4  gap-7 '>
        <div className='w-full h-[200px] bg-white/5 backdrop-blur-md rounded flex items-center justify-center flex-col gap-3 '>
            <h2 className='text-2xl font-black  '>{title}</h2>
            <p className='text-2xl font-black text-gray-600'>{description}</p>
        </div>
    </div>
  )
}

export default ProjectCard
