import React from 'react'

const ProjectCard = ({title,description}) => {
  return (
    <div className='bg-white/20 backdrop-blur-sm  rounded-xl shadow-l p-6 w-full max-w-sm '>
        <h2 className='text-xl font-bold text-white mb-3' >{title}</h2>
        <p className='text-gray-200'>{description}</p>
    </div>
  )
}

export default ProjectCard
