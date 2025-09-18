'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SummariesPanel } from '../components/SummariesPanel';
import { Calendar } from 'lucide-react';

export default function SummariesPage() {
  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly' | 'monthly'>(
    'daily'
  );

  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header with Time Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Performance Summaries
              </h1>
              <p className="text-muted-foreground">
                AI-generated insights and performance reports
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
              <Button
                variant={timeFilter === 'monthly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeFilter('monthly')}
                className="text-xs"
              >
                Monthly
              </Button>
            </div>
          </div>
        </div>

        <SummariesPanel timeFilter={timeFilter} />
      </div>
    </main>
  );
}
