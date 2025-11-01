import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExperienceCard from './components/ExperienceCard';

const initialFormState = {
  companyName: '',
  jobTitle: '',
  location: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: ''
};

function App() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [formData, setFormData] = useState(initialFormState);

  //   data fetching  ---
  useEffect(() => {
    fetchExperiences();
  }, []);

  // Function to fetch data after submit
  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/experience');
      setExperiences(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load work experience. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // changes in the form inputs ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;


    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  //  form submission ---
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the browser from refreshing the page

    const dataToSubmit = {
      ...formData,
      description: formData.description.split(',').map(item => item.trim())
    };

    try {
      // CREATE (POST) REQUEST ---
      const response = await axios.post('http://localhost:3000/api/experience', dataToSubmit);


      setExperiences(prevExperiences => [response.data, ...prevExperiences]);

      // Clear the form
      setFormData(initialFormState);

    } catch (err) {
      console.error("Error creating experience:", err);
      setError("Failed to create experience. Check the console.");
    }
  };


  // Loading/Error
  if (loading && experiences.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-400">Loading experience...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-400">{error}</p>
      </div>
    );
  }


  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Work Experience
      </h1>

      {/* THE NEW FORM --- */}
      <form onSubmit={handleSubmit} className="mb-10 p-6 bg-gray-800 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 className="text-2xl font-semibold text-white col-span-1 md:col-span-2">Add New Experience</h2>

        {/* inputs */}
        <input name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="Job Title" className="p-2 rounded bg-gray-700 text-white" required />
        <input name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Company Name" className="p-2 rounded bg-gray-700 text-white" required />
        <input name="location" value={formData.location} onChange={handleInputChange} placeholder="Location (e.g., Remote)" className="p-2 rounded bg-gray-700 text-white" />

        {/* Date inputs */}
        <div className="text-gray-400">
          Start Date: <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="p-2 rounded bg-gray-700 text-white w-full" required />
        </div>
        <div className="text-gray-400">
          End Date: <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="p-2 rounded bg-gray-700 text-white w-full" disabled={formData.isCurrent} />
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2 text-white md:col-span-2">
          <input type="checkbox" name="isCurrent" checked={formData.isCurrent} onChange={handleInputChange} className="h-5 w-5" />
          <label>I currently work here</label>
        </div>

        {/* Text area for description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description (separate points with a comma)"
          className="p-2 rounded bg-gray-700 text-white md:col-span-2"
        />

        {/* Submit Button */}
        <button type="submit" className="p-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors md:col-span-2">
          Add Experience
        </button>
      </form>

      {loading && <p className="text-center text-gray-400">Loading...</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map(exp => (
          <ExperienceCard key={exp._id} experience={exp} />
        ))}
      </div>
    </div>
  );
}

export default App;