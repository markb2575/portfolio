import { certifications } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaAws } from "react-icons/fa";

export default function Certification({ certificationsRef }: { certificationsRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div id="certifications-section" ref={certificationsRef} className="fade-in">
      <h2 className="section">Certifications</h2>
      <div className="gap-4 mb-6">
        {certifications.map((item, index) => (
          <Card
            key={index}
            className="h-full w-full bg-opacity-60 dark:bg-black/10 backdrop-blur-sm"
          >
            <CardHeader className="justify-between w-full flex flex-row pb-4">
              <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
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
              onClick={() => window.open(item.url, "_blank")}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
