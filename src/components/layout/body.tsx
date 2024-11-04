import data from '../../app/data.json';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FaGithub, FaAws } from 'react-icons/fa';
type data = {
    skills: { "language/framework": string[]; "technology": string[], "additional": string[] };
    experiences: { title: string; company: string; details: string[]; start_date: string; end_date: string; }[];
    education: { school: string; major: string; courses: string[]; start_date: string; end_date: string; gpa: string }[];
    projects: { name: string; url: string, skills: string[], description: string }[];
    certifications: { name: string; start_date: string; end_date: string; url: string, description: string }[];
};
export default function Body() {
    return (
        <div className="px-10 flex flex-col">

            {/* Skills */}
            <div className='w-full'>
                <h2 className="section">Skills</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                    {data?.skills['language/framework'].map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                    {data?.skills['technology'].map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                    {data?.skills['additional'].map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                </div>
            </div>

            {/* Experience */}
            <h2 className="section">Experience</h2>
            <div className="gap-4 mb-6">
                {data?.experience.map((experience, index) => (
                    <Card key={index} className="h-full w-full">
                        <CardHeader className='justify-between w-full flex flex-row pb-4'>
                            <CardTitle className="text-lg font-bold">{experience.title}</CardTitle>
                            <CardTitle className='text-sm font-bold'>{experience.start_date} - {experience.end_date}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className='text-base'>{experience.company}</CardDescription>
                            <div className="flex flex-wrap gap-2 mt-5">
                                {data?.experience.map((item, _) =>
                                    item.details.map((detail, index) => (
                                        <Badge key={index} variant="secondary">{detail}</Badge>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Education */}
            <h2 className="section">Education</h2>
            <div className="gap-4 mb-6">
                {data?.education.map((item, index) => (
                    <Card key={index} className="h-full w-full">
                        <CardHeader className='justify-between w-full flex flex-row pb-4'>
                            <CardTitle className="text-lg font-bold">{item.school}</CardTitle>
                            <CardTitle className='text-sm font-bold'>{item.start_date} - {item.end_date}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>B.S. {item.major}</CardDescription>
                            <CardDescription>GPA: {item.gpa}</CardDescription>
                            <div className="flex flex-wrap gap-2 mt-5">
                                {data?.education.map((item, _) =>
                                    item.courses.map((course, index) => (
                                        <Badge key={index} variant="secondary">{course}</Badge>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Certifications */}
            <h2 className="section">Certifications</h2>
            <div className="gap-4 mb-6">
                {data?.certifications.map((item, index) => (
                    <Card key={index} className="flex flex-col w-72 h-64">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
                            <CardTitle className='text-sm font-bold'>{item.start_date} - {item.end_date}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent>


                            <FaAws className='dark:text-slate-300 text-slate-600 size-8 drop-shadow-md hover:text-slate-500 hover:dark:text-slate-500 cursor-pointer' onClick={() => window.location.href = item.url} />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Projects */}
            <div className='w-full'>
                <h2 className="section">Projects</h2>
                <div className="flex flex-wrap gap-4">
                    {data?.projects.map((project, index) => (
                        <Card key={index} className="flex flex-col w-72 h-64">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">{project.name}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex flex-wrap gap-2">
                                    {project.skills.map(skill => (
                                        <Badge key={skill} variant="secondary">{skill}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <FaGithub className="mb-5 ml-5 dark:text-slate-300 text-slate-600 size-8 drop-shadow-md hover:text-slate-500 hover:dark:text-slate-500 cursor-pointer" onClick={() => window.location.href = project.url} />
                        </Card>
                    ))}
                </div>
            </div>
        </div>

    );
}
