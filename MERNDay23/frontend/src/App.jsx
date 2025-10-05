import React, { useEffect, useState } from 'react';
import ProjectCard from './component/Card';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/projects`);
      const data = await res.json();
      setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-100 flex flex-col items-center justify-start p-6 space-y-6">
      <h1 className="text-3xl font-extrabold text-white"> Projects</h1>
      {loading && <p className="text-white">Loading projects...</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-4">
        {projects.map(p => (
          <ProjectCard key={p._id || p.id} title={p.title} description={p.description} />
        ))}
      </div>
    </div>
  );
}

export default App;