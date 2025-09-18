'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Building, Warehouse, Filter, X, MapPin } from 'lucide-react';

interface AccessFiltersProps {
  selectedBranches: string[];
  selectedWarehouses: string[];
  onBranchChange: (branches: string[]) => void;
  onWarehouseChange: (warehouses: string[]) => void;
  userRole: string;
}

export function AccessFilters({
  selectedBranches,
  selectedWarehouses,
  onBranchChange,
  onWarehouseChange,
  userRole,
}: AccessFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock data - would come from API based on user permissions
  const availableBranches = [
    { id: 'branch-1', name: 'West Coast', location: 'Los Angeles, CA' },
    { id: 'branch-2', name: 'East Coast', location: 'New York, NY' },
    { id: 'branch-3', name: 'Midwest', location: 'Chicago, IL' },
    { id: 'branch-4', name: 'South', location: 'Houston, TX' },
    { id: 'branch-5', name: 'Headquarters', location: 'Seattle, WA' },
  ];

  const availableWarehouses = [
    { id: 'warehouse-1', name: 'LA Distribution', branchId: 'branch-1' },
    { id: 'warehouse-2', name: 'Manhattan Hub', branchId: 'branch-2' },
    { id: 'warehouse-3', name: 'Chicago Center', branchId: 'branch-3' },
    { id: 'warehouse-4', name: 'Houston Depot', branchId: 'branch-4' },
    { id: 'warehouse-5', name: 'Main Hub', branchId: 'branch-5' },
    { id: 'warehouse-6', name: 'Oakland Facility', branchId: 'branch-1' },
    { id: 'warehouse-7', name: 'Brooklyn Center', branchId: 'branch-2' },
  ];

  const toggleBranch = (branchId: string) => {
    const newSelection = selectedBranches.includes(branchId)
      ? selectedBranches.filter((id) => id !== branchId)
      : [...selectedBranches, branchId];
    onBranchChange(newSelection);
  };

  const toggleWarehouse = (warehouseId: string) => {
    const newSelection = selectedWarehouses.includes(warehouseId)
      ? selectedWarehouses.filter((id) => id !== warehouseId)
      : [...selectedWarehouses, warehouseId];
    onWarehouseChange(newSelection);
  };

  const clearAllFilters = () => {
    onBranchChange([]);
    onWarehouseChange([]);
  };

  const getFilteredWarehouses = () => {
    if (selectedBranches.length === 0) return availableWarehouses;
    return availableWarehouses.filter((w) =>
      selectedBranches.includes(w.branchId)
    );
  };

  // Don't show filters for super admin (they see everything by default)
  if (userRole === 'super_admin') {
    return null;
  }

  return (
    <Card className="mb-6 border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Data Access Filters</CardTitle>
            {(selectedBranches.length > 0 || selectedWarehouses.length > 0) && (
              <Badge variant="secondary" className="ml-2">
                {selectedBranches.length + selectedWarehouses.length} active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {(selectedBranches.length > 0 || selectedWarehouses.length > 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs"
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        </div>
        <CardDescription>
          Filter data by branches and warehouses you have access to
        </CardDescription>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Branch Filters */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Building className="h-4 w-4" />
                Branches ({selectedBranches.length}/{availableBranches.length})
              </Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {availableBranches.map((branch) => (
                  <div
                    key={branch.id}
                    className={`
                      flex items-center justify-between p-3 border border-border rounded-md cursor-pointer transition-colors
                        ${
                          selectedBranches.includes(branch.id)
                            ? 'bg-primary/10 border-primary/30'
                            : 'bg-muted/30 hover:bg-primary/10 hover:text-primary'
                        }
                    `}
                    onClick={() => toggleBranch(branch.id)}
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {branch.name}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {branch.location}
                      </p>
                    </div>
                    {selectedBranches.includes(branch.id) && (
                      <Badge className="bg-primary text-white text-xs">
                        Selected
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Warehouse Filters */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Warehouse className="h-4 w-4" />
                Warehouses ({selectedWarehouses.length}/
                {getFilteredWarehouses().length})
              </Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {getFilteredWarehouses().map((warehouse) => {
                  const branch = availableBranches.find(
                    (b) => b.id === warehouse.branchId
                  );
                  return (
                    <div
                      key={warehouse.id}
                      className={`
                        flex items-center justify-between p-3 border border-border rounded-md cursor-pointer transition-colors
                        ${
                          selectedWarehouses.includes(warehouse.id)
                            ? 'bg-primary/10 border-primary/30'
                            : 'bg-muted/30 hover:bg-primary/10 hover:text-primary'
                        }
                      `}
                      onClick={() => toggleWarehouse(warehouse.id)}
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {warehouse.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {branch?.name}
                        </p>
                      </div>
                      {selectedWarehouses.includes(warehouse.id) && (
                        <Badge className="bg-primary text-white text-xs">
                          Selected
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(selectedBranches.length > 0 || selectedWarehouses.length > 0) && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">
                Active Filters:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedBranches.map((branchId) => {
                  const branch = availableBranches.find(
                    (b) => b.id === branchId
                  );
                  return (
                    <Badge key={branchId} variant="outline" className="text-xs">
                      <Building className="h-3 w-3 mr-1" />
                      {branch?.name}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBranch(branchId);
                        }}
                      />
                    </Badge>
                  );
                })}
                {selectedWarehouses.map((warehouseId) => {
                  const warehouse = availableWarehouses.find(
                    (w) => w.id === warehouseId
                  );
                  return (
                    <Badge
                      key={warehouseId}
                      variant="outline"
                      className="text-xs"
                    >
                      <Warehouse className="h-3 w-3 mr-1" />
                      {warehouse?.name}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWarehouse(warehouseId);
                        }}
                      />
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
