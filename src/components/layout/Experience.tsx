import { experience } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Experience({ experienceRef }: { experienceRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div id="experience-section" ref={experienceRef} className="fade-in">
      <h2 className="section">Experience</h2>
      <div className="flex flex-col gap-4 mb-6">
        {experience.map((experience, index) => (
          <Card
            key={index}
            className="h-full w-full relative bg-opacity-60 dark:bg-black/10 backdrop-blur-sm"
          >
            <CardHeader className="justify-between w-full flex flex-row pb-4">
              <CardTitle className="text-lg font-bold">
                {experience.title}
              </CardTitle>
              <CardTitle className="text-sm font-bold text-right">
                {experience.start_date} - {experience.end_date}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {experience.company}
              </CardDescription>
              <CardDescription className="text-sm mt-3">
                {experience.blurb}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-5 cursor-default">
                {experience.details.map((detail, index) => (
                  <Badge key={index} variant="secondary">
                    {detail}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
