import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Truck,
  Clock,
  CheckCircle,
} from 'lucide-react';
import LatestChart from './LatestChart';
import DriversTable from './DriversTable';

export function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Active Drivers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">127</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12%
              </span>{' '}
              from last week
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Deliveries Today
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8%
              </span>{' '}
              from yesterday
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
            <div className="text-2xl font-bold text-card-foreground">24.3m</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 inline-flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.1m
              </span>{' '}
              improvement
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
            <div className="text-2xl font-bold text-card-foreground">94.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +1.2%
              </span>{' '}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <LatestChart />
        </div>
        {/* Quick Actions */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Quick Actions
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Common tasks and operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-primary hover:bg-primary/90 text-white">
              <Truck className="mr-2 h-4 w-4" />
              Upload New Data
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-border text-foreground bg-transparent"
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Drivers
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-border text-foreground bg-transparent"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        {/* <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Recent Alerts
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Important notifications and issues
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Route Delay
                </p>
                <p className="text-xs text-muted-foreground">
                  Driver #247 - 15min behind schedule
                </p>
              </div>
              <Badge variant="destructive">High</Badge>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Route Completed
                </p>
                <p className="text-xs text-muted-foreground">
                  Driver #156 - All deliveries successful
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Success
              </Badge>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
              <XCircle className="h-5 w-5 text-accent" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Failed Delivery
                </p>
                <p className="text-xs text-muted-foreground">
                  Address not found - requires attention
                </p>
              </div>
              <Badge className="bg-accent text-accent-foreground">Medium</Badge>
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Performance Summary */}
      {/* <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Today's Performance Summary
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Key insights and recommendations from AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <h4 className="font-medium text-foreground mb-2">
                🎯 Top Performer
              </h4>
              <p className="text-sm text-muted-foreground">
                Driver Sarah Johnson (#156) completed 47 deliveries with 100%
                success rate and 18% faster than average.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <h4 className="font-medium text-foreground mb-2">
                ⚡ Efficiency Insight
              </h4>
              <p className="text-sm text-muted-foreground">
                Route optimization in Zone C reduced average delivery time by
                12%. Consider applying similar patterns to Zone A.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <h4 className="font-medium text-foreground mb-2">
                📈 Trend Alert
              </h4>
              <p className="text-sm text-muted-foreground">
                Morning deliveries are 23% more efficient than afternoon.
                Consider shifting more capacity to 8-11 AM window.
              </p>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Drivers Table */}
      <DriversTable />
    </div>
  );
}
