import { getLaunches } from "../api/launches/route";
import { getRockets } from "../api/rockets/route";
import { Launch, Rocket } from "../util/types";
import Launches from "../components/Launches";

export default async function PageLaunches() {
  const launches: Launch[] = await getLaunches();
  const rockets: Rocket[] = await getRockets();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-5xl font-bold">SpaceX Launches</h1>
        <Launches launches={launches} rockets={rockets}></Launches>
      </div>
    </main>
  );
}
