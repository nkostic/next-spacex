export default async function PageHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-5xl font-bold">SpaceX Launches</h1>
        <a href="/launches">Launches</a>
        <a href="/rockets">Rockets</a>
      </div>
    </main>
  );
}
