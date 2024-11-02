import data from '../../app/data.json';
import { useEffect, useState } from 'react';
type data = {
    skills: { "language/framework": string[]; "technology": string[], "additional": string[] };
    experiences: { title: string; company: string; details: string[] }[];
    projects: { name: string; description: string }[];
};
export default function Body() {
    return (
        <div className="px-10 flex">
            <div className='w-2/3 mr-10'>
                <h2 className="section">Skills</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                    {data?.skills['language/framework'].map((skill, index) => (
                        <div key={index} className="skill-bubble">
                            {skill}
                        </div>
                    ))}
                    {data?.skills['technology'].map((skill, index) => (
                        <div key={index} className="skill-bubble">
                            {skill}
                        </div>
                    ))}
                    {data?.skills['additional'].map((skill, index) => (
                        <div key={index} className="skill-bubble">
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className=''>
                    <h2 className="section">Experience</h2>
                    <div className="flex flex-wrap gap-4 mb-6">
                        {data?.experience.map((experience, index) => (
                            <div key={index} className="p-4 bg-green-200 text-green-900 rounded-lg shadow-md max-w-xs skill-bubble">
                                <h3 className="font-semibold">{experience.title}</h3>
                                <p className="text-sm">{experience.company}</p>
                                <ul className="list-disc list-inside text-sm mt-2">
                                    {experience.details.map((detail, i) => (
                                        <li key={i}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="section">Projects</h2>
                    <div className="flex flex-wrap gap-4">
                        {data?.projects.map((project, index) => (
                            <div key={index} className="p-4 bg-purple-200 text-purple-900 rounded-lg shadow-md max-w-xs skill-bubble">
                                <h3 className="font-semibold">{project.name}</h3>
                                <p className="text-sm">{project.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
