import data from "../../app/data.json";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaGithub, FaAws } from "react-icons/fa";
import useIsVisible from "@/app/hooks/useIsVisible";
import { useRef, createRef } from "react";
import useIsTop from "@/app/hooks/useIsTop";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useStats } from "@/app/hooks/useStats";

type data = {
    skills: {
        "language/framework": string[];
        technology: string[];
        additional: string[];
    };
    experiences: {
        title: string;
        company: string;
        details: string[];
        start_date: string;
        end_date: string;
    }[];
    education: {
        school: string;
        major: string;
        courses: string[];
        start_date: string;
        end_date: string;
        gpa: string;
    }[];
    projects: {
        name: string;
        url: string;
        skills: string[];
        description: string;
    }[];
    certifications: {
        name: string;
        start_date: string;
        end_date: string;
        url: string;
        description: string;
    }[];
};

export default function Body() {
    const skillsRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);
    const educationRef = useRef<HTMLDivElement>(null);
    const certificationsRef = useRef<HTMLDivElement>(null);
    const projectRefs = useRef(
        data.projects.map(() => createRef<HTMLDivElement>())
    );
    const statsRef = useRef<HTMLDivElement>(null);
    useIsVisible([
        statsRef,
        skillsRef,
        experienceRef,
        educationRef,
        certificationsRef,
        ...projectRefs.current,
    ]);
    const isTop = useIsTop();
    const { clicks, visits } = useStats();

    return (
        <div
            className={cn(
                "px-10 w-full lg:w-2/3 justify-self-center mt-32 transition-opacity duration-200 relative -z-10",
                isTop ? "opacity-0 " : "opacity-100"
            )}
        >
            <div
                className="flex flex-col items-center gap-2"
                onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
            >
                <div className="flex gap-5 dark:text-neutral-300 text-neutral-700 hover:opacity-50 cursor-pointer">
                    <ArrowUp className="animate-bounce" />
                    <ArrowUp className="animate-bounce delay-150" />
                    <ArrowUp className="animate-bounce delay-300" />
                </div>
            </div>
            {/* Skills */}
            <div id="skills-section" ref={skillsRef} className="fade-in">
                <h2 className="section">Skills</h2>
                <div className="w-full opacity-100">
                    <div className="flex flex-wrap gap-2 mb-6 cursor-default">
                        {data?.skills["language/framework"].map(
                            (skill, index) => (
                                <Badge key={index} variant="secondary">
                                    {skill}
                                </Badge>
                            )
                        )}
                        {data?.skills["technology"].map((skill, index) => (
                            <Badge key={index} variant="secondary">
                                {skill}
                            </Badge>
                        ))}
                        {data?.skills["additional"].map((skill, index) => (
                            <Badge key={index} variant="secondary">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            {/* Experience */}
            <div
                id="experience-section"
                ref={experienceRef}
                className="fade-in"
            >
                <h2 className="section">Experience</h2>
                <div className="gap-4 mb-6">
                    {data?.experience.map((experience, index) => (
                        <Card
                            key={index}
                            className="h-full w-full relative bg-opacity-60 dark:bg-opacity-60 backdrop-blur-sm"
                        >
                            <CardHeader className="justify-between w-full flex flex-row pb-4">
                                <CardTitle className="text-lg font-bold">
                                    {experience.title}
                                </CardTitle>
                                <CardTitle className="text-sm font-bold text-right">
                                    {experience.start_date} -{" "}
                                    {experience.end_date}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    {experience.company}
                                </CardDescription>
                                <div className="flex flex-wrap gap-2 mt-5 cursor-default">
                                    {data?.experience.map((item) =>
                                        item.details.map((detail, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                            >
                                                {detail}
                                            </Badge>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Education */}
            <div id="education-section" ref={educationRef} className="fade-in">
                <h2 className="section">Education</h2>
                <div className="gap-4 mb-6">
                    {data?.education.map((item, index) => (
                        <Card
                            key={index}
                            className="h-full w-full bg-opacity-60 dark:bg-opacity-60 backdrop-blur-sm"
                        >
                            <CardHeader className="justify-between w-full flex flex-row pb-4">
                                <CardTitle className="text-lg font-bold">
                                    {item.school}
                                </CardTitle>
                                <CardTitle className="text-sm font-bold text-right">
                                    {item.start_date} - {item.end_date}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    B.S. {item.major}
                                </CardDescription>
                                <CardDescription className="text-base">
                                    GPA: {item.gpa}
                                </CardDescription>
                                <div className="flex flex-wrap gap-2 mt-5 cursor-default">
                                    {data?.education.map((item) =>
                                        item.courses.map((course, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="text-ellipsis max-w-xs hover:line-clamp-none line-clamp-1"
                                            >
                                                {course}
                                            </Badge>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Certifications */}
            <div
                id="certifications-section"
                ref={certificationsRef}
                className="fade-in"
            >
                <h2 className="section">Certifications</h2>
                <div className="gap-4 mb-6">
                    {data?.certifications.map((item, index) => (
                        <Card
                            key={index}
                            className="h-full w-full bg-opacity-60 dark:bg-opacity-60 backdrop-blur-sm"
                        >
                            <CardHeader className="justify-between w-full flex flex-row pb-4">
                                <CardTitle className="text-lg font-bold">
                                    {item.name}
                                </CardTitle>
                                <CardTitle className="text-sm font-bold text-right">
                                    {item.start_date} - {item.end_date}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription className="text-base">
                                    {item.description}
                                </CardDescription>
                            </CardContent>
                            <FaAws
                                className="mb-5 ml-5 dark:text-neutral-300 text-neutral-600 size-8 drop-shadow-md hover:opacity-50 cursor-pointer"
                                onClick={() =>
                                    (window.location.href = item.url)
                                }
                            />
                        </Card>
                    ))}
                </div>
            </div>

            {/* Projects */}
            <div id="projects-section">
                <h2 className="section">Projects</h2>
                <div className="flex flex-wrap gap-4 mb-6">
                    {data?.projects.map((project, index) => (
                        <Card
                            key={index}
                            ref={projectRefs.current[index]}
                            className="flex flex-col md:w-72 flex-grow h-72 w-full fade-in bg-opacity-60 dark:bg-opacity-60 backdrop-blur-sm"
                        >
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">
                                    {project.name}
                                </CardTitle>
                                <CardDescription className="text-base">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex flex-wrap gap-2 cursor-default">
                                    {project.skills.map((skill) => (
                                        <Badge key={skill} variant="secondary">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <FaGithub
                                className="mb-5 ml-5 dark:text-neutral-300 text-neutral-600 size-8 drop-shadow-md hover:opacity-50  cursor-pointer"
                                onClick={() =>
                                    (window.location.href = project.url)
                                }
                            />
                        </Card>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div id="stats-section">
                <h2 className="section">Stats</h2>
                <div className="flex flex-wrap gap-4">
                    <Card
                        ref={statsRef}
                        className="h-full w-full relative bg-opacity-60 dark:bg-opacity-60 backdrop-blur-sm"
                    >
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">
                                How these stats are tracked
                            </CardTitle>
                            <CardDescription className="text-base">
                                Updated and fetched through API Gateway with
                                AWS Lambda and stored in DynamoDB.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4 text-lg text-zinc-800 dark:text-zinc-100">
                            <div className="flex items-center gap-5 px-2 py-1 rounded-md">
                                <span className="font-medium">
                                    Total Clicks
                                </span>
                                <span className="font-mono text-xl text-neutral-600 dark:text-neutral-400">
                                    {clicks}
                                </span>
                            </div>
                            <div className="flex items-center gap-5 px-2 py-1 rounded-md">
                                <span className="font-medium">
                                    Total Visits
                                </span>
                                <span className="font-mono text-xl  text-neutral-600 dark:text-neutral-400">
                                    {visits}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
