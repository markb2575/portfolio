import data from '../../app/data.json';
type data = {
    skills: { "language/framework": string[]; "technology": string[], "additional": string[] };
    experiences: { title: string; company: string; details: string[]; start_date: string; end_date: string; }[];
    education: { school: string; major: string; courses: string[]; start_date: string; end_date: string; gpa: string }[];
    projects: { name: string; url: string }[];
};
export default function Body() {
    return (
        <div className="px-10 flex flex-col md:flex-row">
            <div className='w-full md:w-1/3 mr-10 mb-10 md:mb-0'>
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
                <h2 className="section">Relevant Courses</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                    {data?.education.map((item, i) =>
                        item.courses.map((course, index) => (
                            <div key={`${i}-${index}`} className="skill-bubble">
                                {course}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className='w-full md:w-1/3 mr-10 mb-10 md:mb-0'>
                <h2 className="section">Experience</h2>
                <div className="gap-4 mb-6">
                    {data?.experience.map((experience, index) => (
                        <div key={index} className="p-4 rounded-lg shadow-md skill-bubble">
                            <div className='flex justify-between'>
                                <div>
                                    <h3 className="font-semibold">{experience.title}</h3>
                                    <p className="text-sm">{experience.company}</p>
                                </div>
                                <div>
                                    {experience.start_date} - {experience.end_date}
                                </div>
                            </div>
                            <div className="border-t flex-grow border-slate-400 dark:border-slate-600 my-2" />
                            <ul className="list-disc list-inside text-sm mt-2 text-left">
                                {experience.details.map((detail, i) => (
                                    <li key={i}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <h2 className="section">Education</h2>
                <div className="gap-4 mb-6">
                    {data?.education.map((item, index) => (
                        <div key={index} className="p-4 rounded-lg shadow-md skill-bubble flex justify-between">
                            <div>
                                <h3 className="font-semibold">{item.school}</h3>
                                <p className="text-base">{item.major}</p>
                            </div>
                            <div>
                                <div>
                                    {item.start_date} - {item.end_date}
                                </div>
                                <div className='text-end text-base'>
                                    {item.gpa} GPA
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='w-full md:w-1/3'>
                <h2 className="section">Projects</h2>
                <div className="flex flex-wrap gap-4">
                    {data?.projects.map((project, index) => (
                        <div key={index} className="skill-bubble cursor-pointer" onClick={() => window.location.href = project.url}>
                            {project.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}
