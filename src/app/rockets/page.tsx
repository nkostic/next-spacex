import { getLaunches } from "../api/launches/route";
import { getRockets } from "../api/rockets/route";
import { Rocket } from "../util/types";

export default async function PageRockets() {
  const rockets: Rocket[] = await getRockets();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-5xl font-bold">Rockets</h1>
        In Progress
      </div>
    </main>
  );
}
