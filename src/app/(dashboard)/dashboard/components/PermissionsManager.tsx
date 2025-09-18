'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Shield,
  Crown,
  Users,
  Building,
  Warehouse,
  CheckCircle,
  X,
  Settings,
  Eye,
  Edit,
  Upload,
  Download,
  MessageSquare,
  FileText,
  TrendingUp,
} from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  critical?: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  permissions: string[];
}

export function PermissionsManager() {
  const [selectedRole, setSelectedRole] =
    useState<string>('operations_manager');

  const permissions: Permission[] = [
    {
      id: 'view_all_data',
      name: 'View All Data',
      description: 'Access to view all organizational data across branches',
      category: 'Data Access',
      icon: Eye,
      critical: true,
    },
    {
      id: 'manage_users',
      name: 'Manage Users',
      description: 'Create, edit, and delete user accounts',
      category: 'User Management',
      icon: Users,
      critical: true,
    },
    {
      id: 'manage_organization',
      name: 'Manage Organization',
      description: 'Modify organization settings and structure',
      category: 'Administration',
      icon: Settings,
      critical: true,
    },
    {
      id: 'view_branch_data',
      name: 'View Branch Data',
      description: 'Access to branch-specific operational data',
      category: 'Data Access',
      icon: Building,
    },
    {
      id: 'view_warehouse_data',
      name: 'View Warehouse Data',
      description: 'Access to warehouse-specific data and metrics',
      category: 'Data Access',
      icon: Warehouse,
    },
    {
      id: 'view_driver_performance',
      name: 'View Driver Performance',
      description: 'Access to driver performance metrics and analytics',
      category: 'Operations',
      icon: TrendingUp,
    },
    {
      id: 'manage_drivers',
      name: 'Manage Drivers',
      description: 'Edit driver information and assignments',
      category: 'Operations',
      icon: Edit,
    },
    {
      id: 'view_analytics',
      name: 'View Analytics',
      description: 'Access to advanced analytics and reporting',
      category: 'Analytics',
      icon: TrendingUp,
    },
    {
      id: 'export_reports',
      name: 'Export Reports',
      description: 'Download and export data reports',
      category: 'Analytics',
      icon: Download,
    },
    {
      id: 'upload_data',
      name: 'Upload Data',
      description: 'Upload Excel files and import data',
      category: 'Data Management',
      icon: Upload,
    },
    {
      id: 'view_summaries',
      name: 'View AI Summaries',
      description: 'Access to AI-generated performance summaries',
      category: 'AI Features',
      icon: FileText,
    },
    {
      id: 'use_chatbot',
      name: 'Use AI Chatbot',
      description: 'Interact with the AI operations assistant',
      category: 'AI Features',
      icon: MessageSquare,
    },
  ];

  const roles: Role[] = [
    {
      id: 'super_admin',
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      icon: Crown,
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      permissions: permissions.map((p) => p.id),
    },
    {
      id: 'operations_manager',
      name: 'Operations Manager',
      description: 'Manage operations across multiple branches',
      icon: Shield,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      permissions: [
        'view_all_data',
        'view_branch_data',
        'view_warehouse_data',
        'view_driver_performance',
        'manage_drivers',
        'view_analytics',
        'export_reports',
        'upload_data',
        'view_summaries',
        'use_chatbot',
      ],
    },
    {
      id: 'branch_manager',
      name: 'Branch Manager',
      description: 'Manage specific branch operations',
      icon: Building,
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      permissions: [
        'view_branch_data',
        'view_warehouse_data',
        'view_driver_performance',
        'manage_drivers',
        'view_analytics',
        'export_reports',
        'view_summaries',
        'use_chatbot',
      ],
    },
    {
      id: 'driver_supervisor',
      name: 'Driver Supervisor',
      description: 'Supervise drivers and manage routes',
      icon: Users,
      color: 'bg-green-100 text-green-800 border-green-200',
      permissions: [
        'view_branch_data',
        'view_driver_performance',
        'manage_drivers',
        'view_summaries',
        'use_chatbot',
      ],
    },
    {
      id: 'analyst',
      name: 'Analyst',
      description: 'Analyze data and generate reports',
      icon: TrendingUp,
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      permissions: [
        'view_branch_data',
        'view_warehouse_data',
        'view_driver_performance',
        'view_analytics',
        'export_reports',
        'view_summaries',
        'use_chatbot',
      ],
    },
    {
      id: 'staff',
      name: 'Staff',
      description: 'Basic access to operational data',
      icon: Users,
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      permissions: [
        'view_branch_data',
        'view_driver_performance',
        'view_summaries',
        'use_chatbot',
      ],
    },
  ];

  const selectedRoleData = roles.find((r) => r.id === selectedRole);
  const categories = [...new Set(permissions.map((p) => p.category))];

  const getPermissionsByCategory = (category: string) => {
    return permissions.filter((p) => p.category === category);
  };

  const hasPermission = (permissionId: string) => {
    return selectedRoleData?.permissions.includes(permissionId) || false;
  };

  return (
    <div className="space-y-6">
      {/* Role Selector */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Role-Based Permissions
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Configure permissions for different user roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => {
              const RoleIcon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <div
                  key={role.id}
                  className={`
                    p-4 border-2 rounded-lg cursor-pointer transition-all
                    ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary hover:bg-primary/10'
                    }
                  `}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <RoleIcon className="h-5 w-5 text-primary" />
                    <h3 className="font-medium text-foreground">{role.name}</h3>
                    {isSelected && (
                      <CheckCircle className="h-4 w-4 text-primary ml-auto" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {role.description}
                  </p>
                  <div className="mt-2">
                    <Badge className={`text-xs ${role.color}`}>
                      {role.permissions.length} permissions
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Permissions Matrix */}
      {selectedRoleData && (
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <selectedRoleData.icon className="h-5 w-5 text-primary" />
                  {selectedRoleData.name} Permissions
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {selectedRoleData.description}
                </CardDescription>
              </div>
              <Badge className={`${selectedRoleData.color}`}>
                {selectedRoleData.permissions.length} of {permissions.length}{' '}
                permissions
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category}>
                  <h4 className="font-medium text-foreground mb-3 pb-2 border-b border-border">
                    {category}
                  </h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    {getPermissionsByCategory(category).map((permission) => {
                      const PermissionIcon = permission.icon;
                      const hasAccess = hasPermission(permission.id);
                      return (
                        <div
                          key={permission.id}
                          className={`
                            flex items-start gap-3 p-3 border border-border rounded-md
                            ${
                              hasAccess
                                ? 'bg-green-50 border-green-200'
                                : 'bg-gray-50'
                            }
                          `}
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {hasAccess ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <PermissionIcon className="h-4 w-4 text-muted-foreground" />
                              <p
                                className={`text-sm font-medium ${
                                  hasAccess ? 'text-green-900' : 'text-gray-600'
                                }`}
                              >
                                {permission.name}
                              </p>
                              {permission.critical && (
                                <Badge
                                  variant="destructive"
                                  className="text-xs"
                                >
                                  Critical
                                </Badge>
                              )}
                            </div>
                            <p
                              className={`text-xs ${
                                hasAccess ? 'text-green-700' : 'text-gray-500'
                              }`}
                            >
                              {permission.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Access Restrictions */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Access Restrictions
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Additional restrictions that apply to this role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 border border-amber-200 bg-amber-50 rounded-md">
              <Building className="h-4 w-4 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">
                  Branch Restrictions
                </p>
                <p className="text-xs text-amber-700">
                  {selectedRole === 'super_admin'
                    ? 'No restrictions - can access all branches'
                    : selectedRole === 'operations_manager'
                    ? 'Can access all branches within their region'
                    : 'Limited to assigned branches only'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border border-blue-200 bg-blue-50 rounded-md">
              <Warehouse className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Warehouse Access
                </p>
                <p className="text-xs text-blue-700">
                  {selectedRole === 'super_admin'
                    ? 'Full access to all warehouse data'
                    : selectedRole === 'operations_manager'
                    ? 'Access to warehouses in managed branches'
                    : 'Limited to assigned warehouse facilities'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
