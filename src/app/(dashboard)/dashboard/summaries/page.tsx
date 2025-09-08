import SummariesPanel from '../components/SummariesPanel';

export default function SummariesPage() {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        Automated Summaries
      </h1>
      <p className="mt-1 text-sm text-black/60">Simulated data. UI only.</p>
      <div className="mt-6">
        <SummariesPanel />
      </div>
    </div>
  );
}
