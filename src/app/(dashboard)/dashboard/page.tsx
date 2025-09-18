'use client';

import { OverviewTab } from './components/overview-tab';

export default function DashboardPage() {
  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Operations Overview
          </h1>
          <p className="text-muted-foreground">
            Monitor driver performance and delivery operations
          </p>
        </div>

        <div className="mt-6">
          <OverviewTab />
        </div>
      </div>
    </main>
  );
}
