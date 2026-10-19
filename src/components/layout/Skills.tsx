import { skills } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function Skills({ skillsRef }: { skillsRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div id="skills-section" ref={skillsRef} className="fade-in">
      <h2 className="section">Skills</h2>
      <div className="w-full opacity-100">
        <div className="flex flex-wrap gap-2 mb-6 cursor-default">
          {Object.values(skills).flat().map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
