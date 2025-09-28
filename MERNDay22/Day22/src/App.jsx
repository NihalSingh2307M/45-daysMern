import React, { useState } from 'react'
import ProjectCard from './components/ProjectCard';

const App = () => {

  const [projects] = useState([
    {
      id: 1,
      title: "Portfolio Website",
      description: "A personal website to showcase my projects and skills",
    },
    {
      id: 2,
      title: "E-commerce App",
      description: "An online store built with MERN stack",
    },
    {
      id: 3,
      title: "Blog Platform",
      description: "A blogging app with authentication and rich editor",
    },
  ]);
  return (
    <div  className="min-h-screen bg-gradient-to-r from-gray-500 to-gray-300 flex flex-col items-center justify-center p-6 space-y-6">
      <h1
      className='text-3xl font-extrabold text-white mb-6'>
        My React Project
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl '>
        {projects.map((project) =>(
          <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          />
        ))}
      </div>
    </div>
  )
}

export default App