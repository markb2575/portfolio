import { education } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Education({ educationRef }: { educationRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div id="education-section" ref={educationRef} className="fade-in">
      <h2 className="section">Education</h2>
      <div className="gap-4 mb-6">
        {education.map((item, index) => (
          <Card
            key={index}
            className="h-full w-full bg-opacity-60 dark:bg-black/10 backdrop-blur-sm"
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
              {item.gpa && <CardDescription className="text-base">
                GPA: {item.gpa}
              </CardDescription>}
              <div className="flex flex-wrap gap-2 mt-5 cursor-default">
                {item.courses.map((course, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-ellipsis max-w-xs hover:line-clamp-none line-clamp-1"
                  >
                    {course}
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
