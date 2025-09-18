'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DriversPanel } from '../components/DriversPanel';
import { AccessFilters } from '../components/AccessFilters';
import { Calendar } from 'lucide-react';

export default function PerformancePage() {
  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly'>('daily');
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [selectedWarehouses, setSelectedWarehouses] = useState<string[]>([]);

  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header with Time Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Driver Performance
              </h1>
              <p className="text-muted-foreground">
                Analytics and performance metrics for all drivers
              </p>
            </div>

            {/* Time Filter */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Button
                variant={timeFilter === 'daily' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeFilter('daily')}
                className="text-xs"
              >
                Daily
              </Button>
              <Button
                variant={timeFilter === 'weekly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeFilter('weekly')}
                className="text-xs"
              >
                Weekly
              </Button>
            </div>
          </div>
        </div>

        {/* Access Filters */}
        <AccessFilters
          selectedBranches={selectedBranches}
          selectedWarehouses={selectedWarehouses}
          onBranchChange={setSelectedBranches}
          onWarehouseChange={setSelectedWarehouses}
          userRole="operations_manager"
        />

        <DriversPanel timeFilter={timeFilter} />
      </div>
    </main>
  );
}
