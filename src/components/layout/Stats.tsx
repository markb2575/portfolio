import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useStats } from "@/hooks/useStats";

export default function Stats({ statsRef }: { statsRef: React.RefObject<HTMLDivElement | null> }) {
  const { clicks, visits } = useStats();

  return (
    <div id="stats-section">
      <h2 className="section">Stats</h2>
      <div className="flex flex-wrap gap-4">
        <Card
          ref={statsRef}
          className="h-full w-full relative bg-opacity-60 dark:bg-black/10 backdrop-blur-sm"
        >
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              How these stats are tracked
            </CardTitle>
            <CardDescription className="text-base">
              Updated and fetched through API Gateway with AWS Lambda and stored in DynamoDB.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-lg text-zinc-800 dark:text-zinc-100">
            <div className="flex items-center gap-5 px-2 py-1 rounded-md">
              <span className="font-medium">Total Clicks</span>
              <span className="font-mono text-xl text-neutral-600 dark:text-neutral-400">
                {clicks}
              </span>
            </div>
            <div className="flex items-center gap-5 px-2 py-1 rounded-md">
              <span className="font-medium">Total Visits</span>
              <span className="font-mono text-xl text-neutral-600 dark:text-neutral-400">
                {visits}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
