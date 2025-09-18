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
import { DriversTable } from './DriversTable';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Star,
  Award,
  Target,
  Filter,
} from 'lucide-react';

interface DriversPanelProps {
  timeFilter: 'daily' | 'weekly';
}

export function DriversPanel({ timeFilter }: DriversPanelProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Driver Performance Analytics
          </h2>
          <p className="text-muted-foreground">
            {timeFilter === 'daily' ? 'Daily' : 'Weekly'} driver performance
            metrics and rankings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Filter className="h-3 w-3 mr-1" />
            Filter Drivers
          </Button>
        </div>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Top Performer
            </CardTitle>
            <Award className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-card-foreground">
              Sarah Johnson
            </div>
            <p className="text-xs text-muted-foreground">
              Driver #156 • 100% success rate
            </p>
            <div className="flex items-center mt-2">
              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18% efficiency
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Most Improved
            </CardTitle>
            <Star className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-card-foreground">
              Mike Chen
            </div>
            <p className="text-xs text-muted-foreground">
              Driver #203 • 98.7% success rate
            </p>
            <div className="flex items-center mt-2">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +25% this week
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Needs Support
            </CardTitle>
            <Target className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-card-foreground">
              Alex Rivera
            </div>
            <p className="text-xs text-muted-foreground">
              Driver #089 • 78% success rate
            </p>
            <div className="flex items-center mt-2">
              <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">
                <TrendingDown className="h-3 w-3 mr-1" />
                -8% efficiency
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drivers Table */}
      <DriversTable />
    </div>
  );
}
