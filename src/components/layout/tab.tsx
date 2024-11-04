import { Button } from "@/components/ui/button"

export default function Tab() {

    const handleTabChange = (value: number) => {
        const sectionIds = [
            'skills-section',
            'experience-section',
            'education-section',
            'certifications-section',
            'projects-section',
        ];

        const section = document.getElementById(sectionIds[value]);

        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    return (
        <div>
            <div className="flex flex-wrap gap-2 justify-center">
                <Button onClick={() => handleTabChange(0)} variant="secondary">Skills</Button>
                <Button onClick={() => handleTabChange(1)} variant="secondary">Experience</Button>
                <Button onClick={() => handleTabChange(2)} variant="secondary">Education</Button>
                <Button onClick={() => handleTabChange(3)} variant="secondary">Certifications</Button>
                <Button onClick={() => handleTabChange(4)} variant="secondary">Projects</Button>
            </div>
        </div>

    );
}
