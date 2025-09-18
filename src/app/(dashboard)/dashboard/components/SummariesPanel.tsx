'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Target,
  Download,
  Calendar,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface SummariesPanelProps {
  timeFilter: 'daily' | 'weekly' | 'monthly';
}

export function SummariesPanel({ timeFilter }: SummariesPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            {timeFilter === 'daily'
              ? "Today's"
              : timeFilter === 'weekly'
              ? "This Week's"
              : "This Month's"}{' '}
            Performance Summary
          </h2>
          <p className="text-muted-foreground flex items-center gap-2 mt-1">
            <Calendar className="h-4 w-4" />
            AI-generated insights for{' '}
            {timeFilter === 'daily'
              ? 'January 18, 2025'
              : timeFilter === 'weekly'
              ? 'Week of January 13-19, 2025'
              : 'January 2025'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-accent/10 text-accent border-accent/20">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Generated
          </Badge>
          <Button variant="outline" size="sm" className="text-xs">
            <Download className="h-3 w-3 mr-1" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Total Deliveries
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {timeFilter === 'daily'
                ? '2,847'
                : timeFilter === 'weekly'
                ? '19,847'
                : '87,234'}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />+
                {timeFilter === 'daily'
                  ? '8'
                  : timeFilter === 'weekly'
                  ? '15'
                  : '22'}
                %
              </span>{' '}
              from last{' '}
              {timeFilter === 'monthly'
                ? 'month'
                : timeFilter === 'weekly'
                ? 'week'
                : 'day'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Success Rate
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {timeFilter === 'daily'
                ? '94.2'
                : timeFilter === 'weekly'
                ? '93.8'
                : '94.7'}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />+
                {timeFilter === 'daily'
                  ? '1.2'
                  : timeFilter === 'weekly'
                  ? '2.1'
                  : '3.4'}
                %
              </span>{' '}
              improvement
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Avg. Delivery Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {timeFilter === 'daily' ? '24.3' : '25.1'}m
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />-
                {timeFilter === 'daily' ? '2.1' : '3.2'}m
              </span>{' '}
              faster
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Active Drivers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {timeFilter === 'daily' ? '127' : '142'}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />+
                {timeFilter === 'daily' ? '12' : '8'}
              </span>{' '}
              this {timeFilter === 'daily' ? 'day' : 'week'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI-Generated Insights
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Key patterns and opportunities identified from your operational data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg border bg-green-50 border-green-200 text-green-600">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium mb-2">Top Performer</h4>
                <p className="text-sm opacity-90">
                  {timeFilter === 'daily'
                    ? 'Sarah Johnson (#156) completed 47 deliveries with 100% success rate, 18% faster than average. Her route optimization techniques could be shared with other drivers.'
                    : 'Top 3 drivers this week: Sarah Johnson (347 deliveries, 100% success), Mike Chen (312 deliveries, 98.7% success), Lisa Rodriguez (298 deliveries, 97.3% success). Consistent performance across all zones.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border bg-amber-50 border-amber-200 text-amber-600">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium mb-2">Attention Needed</h4>
                <p className="text-sm opacity-90">
                  {timeFilter === 'daily'
                    ? 'Zone C showing 87% success rate, 7% below target. Main issues: traffic congestion during 2-4 PM window and 3 customer unavailability incidents.'
                    : 'Wednesday and Friday showing 5% lower performance. Analysis suggests correlation with local traffic patterns and school schedules affecting delivery windows.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border bg-blue-50 border-blue-200 text-blue-600">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium mb-2">Efficiency Insight</h4>
                <p className="text-sm opacity-90">
                  {timeFilter === 'daily'
                    ? 'Morning deliveries (8-11 AM) are 23% more efficient than afternoon. Consider shifting more capacity to morning hours for Zone C.'
                    : 'Overall delivery time improved by 3.2 minutes this week. Route optimization algorithm showing positive results across all zones.'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Recommended Actions
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            AI-suggested improvements based on performance analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(timeFilter === 'daily'
              ? [
                  'Schedule more drivers for Zone C during 2-4 PM peak hours',
                  "Implement Sarah Johnson's route optimization techniques company-wide",
                  'Pre-contact customers in Zone C to confirm availability',
                  'Test morning-heavy scheduling for Zone C next week',
                ]
              : [
                  'Adjust Wednesday and Friday schedules to account for traffic patterns',
                  'Expand route optimization training to remaining drivers',
                  'Consider bonus incentives for consistent top performers',
                  'Implement predictive scheduling for school zone deliveries',
                ]
            ).map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50 border border-border"
              >
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">
                    {index + 1}
                  </span>
                </div>
                <p className="text-sm text-foreground">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
