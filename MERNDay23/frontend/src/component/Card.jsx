import React from 'react'

const ProjectCard = ({title,description}) => {
  return (
    <div
    className=' w-full max-w-sm bg-white/10 backdrop-blur-sm border border-white/20 rounded-md p-6'
    >
        <h2
        className='text-xl font-bold text-white mb-2'
        >
            {title}
        </h2>
        
        <p
        className='text-gray-200'
        >
            {description}
        </p>
    </div>
  )
}

export default ProjectCard
