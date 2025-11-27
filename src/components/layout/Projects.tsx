import { projects } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Projects({ projectRefs }: { projectRefs: React.RefObject<HTMLDivElement | null>[] }) {
  return (
    <div id="projects-section">
      <h2 className="section">Projects</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        {projects.map((project, index) => (
          <Card
            key={index}
            ref={projectRefs[index]}
            className={cn(
                "flex flex-col md:w-72 flex-grow md:h-72 h-fit w-full fade-in bg-opacity-60 dark:bg-black/10 backdrop-blur-sm",
                project.highlight && "border-opacity-50 border-black bg-black/5 dark:bg-white/5 "
            )}
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
            <div className="flex">
              {project.github_url && (
                <FaGithub
                  className="mb-5 ml-5 dark:text-neutral-300 text-neutral-600 size-7 drop-shadow-md hover:opacity-50 cursor-pointer"
                  onClick={() => window.open(project.github_url, "_blank")}
                />
              )}
              {project.site_url && (
                <ExternalLink
                  className="mb-5 ml-5 dark:text-neutral-300 text-neutral-600 size-7 drop-shadow-md hover:opacity-50 cursor-pointer"
                  onClick={() => window.open(project.site_url, "_blank")}
                />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
