// Role-Based Access Control System

export type Role =
  | 'super_admin'
  | 'operations_manager'
  | 'branch_manager'
  | 'driver_supervisor'
  | 'analyst'
  | 'staff';

export type Permission =
  | 'view_all_data'
  | 'manage_users'
  | 'manage_organization'
  | 'view_branch_data'
  | 'view_warehouse_data'
  | 'view_driver_performance'
  | 'manage_drivers'
  | 'view_analytics'
  | 'export_reports'
  | 'upload_data'
  | 'view_summaries'
  | 'use_chatbot'
  | 'manage_routes'
  | 'view_team';

export type UserContext = {
  role: Role;
  branchIds?: string[];
  warehouseIds?: string[];
  userId: string;
};

// Role-Permission mapping
export const rolePermissions: Record<Role, Permission[]> = {
  super_admin: [
    'view_all_data',
    'manage_users',
    'manage_organization',
    'view_branch_data',
    'view_warehouse_data',
    'view_driver_performance',
    'manage_drivers',
    'view_analytics',
    'export_reports',
    'upload_data',
    'view_summaries',
    'use_chatbot',
    'manage_routes',
    'view_team',
  ],
  operations_manager: [
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
    'manage_routes',
    'view_team',
  ],
  branch_manager: [
    'view_branch_data',
    'view_warehouse_data',
    'view_driver_performance',
    'manage_drivers',
    'view_analytics',
    'export_reports',
    'view_summaries',
    'use_chatbot',
    'manage_routes',
    'view_team',
  ],
  driver_supervisor: [
    'view_branch_data',
    'view_driver_performance',
    'manage_drivers',
    'view_summaries',
    'use_chatbot',
    'manage_routes',
  ],
  analyst: [
    'view_branch_data',
    'view_warehouse_data',
    'view_driver_performance',
    'view_analytics',
    'export_reports',
    'view_summaries',
    'use_chatbot',
  ],
  staff: [
    'view_branch_data',
    'view_driver_performance',
    'view_summaries',
    'use_chatbot',
  ],
};

// Check if user has specific permission
export function hasPermission(
  userContext: UserContext,
  permission: Permission
): boolean {
  const userPermissions = rolePermissions[userContext.role];
  return userPermissions.includes(permission);
}

// Check if user can access specific branch data
export function canAccessBranch(
  userContext: UserContext,
  branchId: string
): boolean {
  // Super admin can access everything
  if (userContext.role === 'super_admin') {
    return true;
  }

  // Operations manager can access all branches
  if (userContext.role === 'operations_manager') {
    return true;
  }

  // Other roles are restricted to their assigned branches
  return userContext.branchIds?.includes(branchId) ?? false;
}

// Check if user can access specific warehouse data
export function canAccessWarehouse(
  userContext: UserContext,
  warehouseId: string
): boolean {
  // Super admin can access everything
  if (userContext.role === 'super_admin') {
    return true;
  }

  // Operations manager can access all warehouses
  if (userContext.role === 'operations_manager') {
    return true;
  }

  // Other roles are restricted to their assigned warehouses
  return userContext.warehouseIds?.includes(warehouseId) ?? false;
}

// Filter data based on user access level
export function filterDataByAccess<
  T extends { branchId?: string; warehouseId?: string }
>(data: T[], userContext: UserContext): T[] {
  // Super admin and operations manager see everything
  if (
    userContext.role === 'super_admin' ||
    userContext.role === 'operations_manager'
  ) {
    return data;
  }

  return data.filter((item) => {
    // Check branch access
    if (item.branchId && !canAccessBranch(userContext, item.branchId)) {
      return false;
    }

    // Check warehouse access
    if (
      item.warehouseId &&
      !canAccessWarehouse(userContext, item.warehouseId)
    ) {
      return false;
    }

    return true;
  });
}

// Get user's accessible navigation items
export function getAccessibleNavigation(userContext: UserContext) {
  const baseNavigation = [
    { name: 'Overview', href: '/dashboard', permission: 'view_branch_data' },
    {
      name: 'AI Chatbot',
      href: '/dashboard/chatbot',
      permission: 'use_chatbot',
    },
    {
      name: 'Summaries',
      href: '/dashboard/summaries',
      permission: 'view_summaries',
    },
    {
      name: 'Driver Performance',
      href: '/dashboard/performance',
      permission: 'view_driver_performance',
    },
    { name: 'Team', href: '/dashboard/team', permission: 'view_team' },
    {
      name: 'User Management',
      href: '/dashboard/users',
      permission: 'manage_users',
    },
    {
      name: 'Data Upload',
      href: '/dashboard/upload',
      permission: 'upload_data',
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      permission: 'view_branch_data',
    },
  ];

  return baseNavigation.filter((item) =>
    hasPermission(userContext, item.permission as Permission)
  );
}

// Mock user context for development (replace with actual auth)
export function getCurrentUserContext(): UserContext {
  // This would normally come from your auth system
  return {
    role: 'operations_manager',
    branchIds: ['branch-1', 'branch-2'],
    warehouseIds: ['warehouse-1', 'warehouse-2'],
    userId: 'user-123',
  };
}
