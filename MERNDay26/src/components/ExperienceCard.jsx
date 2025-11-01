import React from 'react';

const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};


const ExperienceCard = ({ experience }) => {


    const {
        jobTitle,
        companyName,
        location,
        startDate,
        endDate,
        isCurrent,
        description
    } = experience;


    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);


    return (

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 
                    shadow-lg hover:shadow-xl hover:-translate-y-1 
                    transition-all duration-200 ease-in-out">

            <div>
                {/* the job title */}
                <h3 className="text-xl font-bold text-blue-400 mb-1">{jobTitle}</h3>
                <p className="text-gray-300 font-semibold mb-2">
                    {companyName} {location ? `| ${location}` : ''}
                </p>
            </div>

            {/*  the dates */}
            <p className="text-gray-500 text-sm italic mb-4">
                {formattedStartDate} – {isCurrent ? 'Present' : formattedEndDate}
            </p>

            {/* list of descriptions:      */}
            <ul className="list-disc list-inside space-y-2 text-gray-300">

                {description && description.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default ExperienceCard;