import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Driver = {
  id: string;
  name: string;
  status: 'Active' | 'On Break' | 'Offline';
  deliveriesToday: number;
  onTimePercent: number;
  avgDeliveryTimeMin: number;
};

const sampleDrivers: Driver[] = [
  {
    id: 'D-101',
    name: 'Sarah Johnson',
    status: 'Active',
    deliveriesToday: 27,
    onTimePercent: 98,
    avgDeliveryTimeMin: 19,
  },
  {
    id: 'D-156',
    name: 'Michael Chen',
    status: 'Active',
    deliveriesToday: 24,
    onTimePercent: 95,
    avgDeliveryTimeMin: 21,
  },
  {
    id: 'D-247',
    name: 'Priya Singh',
    status: 'On Break',
    deliveriesToday: 18,
    onTimePercent: 91,
    avgDeliveryTimeMin: 23,
  },
  {
    id: 'D-303',
    name: 'Carlos Ramirez',
    status: 'Offline',
    deliveriesToday: 0,
    onTimePercent: 0,
    avgDeliveryTimeMin: 0,
  },
];

function StatusBadge({ status }: { status: Driver['status'] }) {
  const styles: Record<Driver['status'], string> = {
    Active: 'bg-green-100 text-green-800 border-green-200',
    'On Break': 'bg-amber-100 text-amber-800 border-amber-200',
    Offline: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export function DriversTable() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-card-foreground">Drivers</CardTitle>
        <Button size="sm" variant="outline" className="border-border">
          View All
        </Button>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground">
              <th className="text-left font-medium py-2 pr-3">Driver</th>
              <th className="text-left font-medium py-2 pr-3">Status</th>
              <th className="text-right font-medium py-2 pr-3">
                Deliveries Today
              </th>
              <th className="text-right font-medium py-2 pr-3">On-time %</th>
              <th className="text-right font-medium py-2 pr-3">Avg Time</th>
              <th className="text-right font-medium py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sampleDrivers.map((d) => (
              <tr key={d.id} className="border-t border-border/60">
                <td className="py-3 pr-3">
                  <div className="flex flex-col">
                    <span className="text-foreground font-medium">
                      {d.name}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {d.id}
                    </span>
                  </div>
                </td>
                <td className="py-3 pr-3">
                  <StatusBadge status={d.status} />
                </td>
                <td className="py-3 pr-3 text-right text-foreground">
                  {d.deliveriesToday}
                </td>
                <td className="py-3 pr-3 text-right">
                  <span
                    className={
                      d.onTimePercent >= 95
                        ? 'text-green-600'
                        : d.onTimePercent >= 85
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }
                  >
                    {d.onTimePercent}%
                  </span>
                </td>
                <td className="py-3 pr-3 text-right text-foreground">
                  {d.avgDeliveryTimeMin}m
                </td>
                <td className="py-3 text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export default DriversTable;
