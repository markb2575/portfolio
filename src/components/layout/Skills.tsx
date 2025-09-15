import { skills } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function Skills({ skillsRef }: { skillsRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div id="skills-section" ref={skillsRef} className="fade-in">
      <h2 className="section">Skills</h2>
      <div className="w-full opacity-100">
        <div className="flex flex-wrap gap-2 mb-6 cursor-default">
          {skills["language/framework"].map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
          {skills["technology"].map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
          {skills["additional"].map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
