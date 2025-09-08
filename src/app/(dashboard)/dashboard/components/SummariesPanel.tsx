export default function SummariesPanel() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {[
        {
          title: 'This week',
          points: [
            'On-time delivery improved by 3.2% vs last week',
            'Top exception: late departures from Branch A',
            'Token-optimized insights enabled',
          ],
        },
        {
          title: 'This month',
          points: [
            'Best performing route: Northwest corridor',
            'Most improved driver: Jordan K (+8% on-time)',
            'Recommendation: adjust cut-off by 15 minutes at Warehouse 3',
          ],
        },
      ].map((card) => (
        <div key={card.title} className="rounded-lg border border-black/10 p-4 bg-white">
          <div className="font-medium">{card.title}</div>
          <ul className="mt-3 space-y-2 text-sm text-black/70">
            {card.points.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}


