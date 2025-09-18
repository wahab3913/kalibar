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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  UserPlus,
  Crown,
  Shield,
  User,
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  Search,
  Filter,
  Building,
  Lock,
  Unlock,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('all');

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Super Admin',
      branch: 'Headquarters',
      warehouse: 'Main Hub',
      avatar: '/avatars/john.jpg',
      status: 'active',
      location: 'New York, NY',
      phone: '+1 (555) 123-4567',
      lastActive: '2 minutes ago',
      permissions: ['all'],
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      role: 'Operations Manager',
      branch: 'West Coast',
      warehouse: 'LA Distribution',
      avatar: '/avatars/sarah.jpg',
      status: 'active',
      location: 'Los Angeles, CA',
      phone: '+1 (555) 987-6543',
      lastActive: '5 minutes ago',
      permissions: ['drivers', 'routes', 'performance'],
      createdAt: '2024-02-10',
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      role: 'Driver Supervisor',
      branch: 'Midwest',
      warehouse: 'Chicago Hub',
      avatar: '/avatars/mike.jpg',
      status: 'active',
      location: 'Chicago, IL',
      phone: '+1 (555) 456-7890',
      lastActive: '1 hour ago',
      permissions: ['drivers', 'schedules'],
      createdAt: '2024-01-28',
    },
    {
      id: 4,
      name: 'Lisa Rodriguez',
      email: 'lisa.r@company.com',
      role: 'Analyst',
      branch: 'South',
      warehouse: 'Houston Center',
      avatar: '/avatars/lisa.jpg',
      status: 'away',
      location: 'Houston, TX',
      phone: '+1 (555) 234-5678',
      lastActive: '3 hours ago',
      permissions: ['reports', 'analytics'],
      createdAt: '2024-03-05',
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.w@company.com',
      role: 'Branch Manager',
      branch: 'East Coast',
      warehouse: 'Boston Depot',
      avatar: '/avatars/david.jpg',
      status: 'inactive',
      location: 'Boston, MA',
      phone: '+1 (555) 345-6789',
      lastActive: '2 days ago',
      permissions: ['branch_data', 'local_reports'],
      createdAt: '2024-01-20',
    },
  ];

  const roles = [
    'Super Admin',
    'Operations Manager',
    'Branch Manager',
    'Driver Supervisor',
    'Analyst',
    'Staff',
  ];

  const branches = [
    'Headquarters',
    'West Coast',
    'East Coast',
    'Midwest',
    'South',
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return Crown;
      case 'Operations Manager':
        return Shield;
      case 'Branch Manager':
        return Building;
      case 'Driver Supervisor':
        return Users;
      default:
        return User;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Operations Manager':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Branch Manager':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Driver Supervisor':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesBranch =
      selectedBranch === 'all' || user.branch === selectedBranch;
    return matchesSearch && matchesRole && matchesBranch;
  });

  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <Users className="h-8 w-8 text-primary" />
                User Management
              </h1>
              <p className="text-muted-foreground">
                Manage users, roles, and permissions across all branches
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Export Users
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search Users</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role-filter">Filter by Role</Label>
                <select
                  id="role-filter"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                >
                  <option value="all">All Roles</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch-filter">Filter by Branch</Label>
                <select
                  id="branch-filter"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                >
                  <option value="all">All Branches</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {users.length}
              </div>
              <p className="text-xs text-muted-foreground">+2 this month</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Active Users
              </CardTitle>
              <div className="h-2 w-2 bg-green-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {users.filter((u) => u.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">Online now</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Branches
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {branches.length}
              </div>
              <p className="text-xs text-muted-foreground">Across regions</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Admin Users
              </CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {users.filter((u) => u.role.includes('Admin')).length}
              </div>
              <p className="text-xs text-muted-foreground">With admin access</p>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Users ({filteredUsers.length})
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage user accounts, roles, and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => {
                const RoleIcon = getRoleIcon(user.role);
                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-primary text-white">
                            {user.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                            user.status === 'active'
                              ? 'bg-green-500'
                              : user.status === 'away'
                              ? 'bg-yellow-500'
                              : 'bg-gray-400'
                          }`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-foreground">
                            {user.name}
                          </p>
                          <Badge
                            className={`text-xs ${getRoleBadgeColor(
                              user.role
                            )}`}
                          >
                            <RoleIcon className="h-3 w-3 mr-1" />
                            {user.role}
                          </Badge>
                          {user.status === 'inactive' && (
                            <Badge variant="destructive" className="text-xs">
                              Inactive
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {user.branch}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {user.warehouse}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Last active: {user.lastActive}</span>
                          <span>•</span>
                          <span>Created: {user.createdAt}</span>
                          <span>•</span>
                          <span>Permissions: {user.permissions.length}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                      >
                        {user.status === 'active' ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                          <DropdownMenuItem>Change Role</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuItem>View Activity</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
