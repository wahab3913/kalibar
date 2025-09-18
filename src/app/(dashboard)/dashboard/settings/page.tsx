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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PermissionsManager } from '../components/PermissionsManager';
import {
  Settings,
  Building,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  User,
  Mail,
  Phone,
} from 'lucide-react';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('organization');

  const sections = [
    { id: 'organization', title: 'Organization', icon: Building },
    { id: 'profile', title: 'Profile', icon: User },
    { id: 'permissions', title: 'Permissions', icon: Shield },
    { id: 'notifications', title: 'Notifications', icon: Bell },
    { id: 'security', title: 'Security', icon: Shield },
    { id: 'appearance', title: 'Appearance', icon: Palette },
    { id: 'integrations', title: 'Integrations', icon: Globe },
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'organization':
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="orgName" className="text-foreground">
                  Organization Name
                </Label>
                <Input
                  id="orgName"
                  defaultValue="Acme Delivery Co."
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgSize" className="text-foreground">
                  Organization Size
                </Label>
                <select className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground">
                  <option value="51-200">51-200 employees</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-foreground">
                  Industry
                </Label>
                <select className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground">
                  <option value="package-delivery">Package Delivery</option>
                  <option value="food-delivery">Food Delivery</option>
                  <option value="logistics">Logistics & Freight</option>
                  <option value="ride-sharing">Ride Sharing</option>
                  <option value="field-services">Field Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-foreground">
                  Timezone
                </Label>
                <select className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground">
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-foreground">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  defaultValue="John"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-foreground">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  defaultValue="Doe"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@company.com"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="bg-input border-border text-foreground"
                />
              </div>
            </div>
          </div>
        );

      case 'permissions':
        return <PermissionsManager />;

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">
                    Email Notifications
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about your operations
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">
                    Performance Alerts
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Get notified when performance metrics change
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">
                    Driver Updates
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Notifications about driver performance and issues
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Password</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Last changed 30 days ago
                </p>
                <Button variant="outline" size="sm">
                  Change Password
                </Button>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-2">
                  Two-Factor Authentication
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline" size="sm">
                  Setup 2FA
                </Button>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-2">
                  Active Sessions
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your active login sessions
                </p>
                <Button variant="outline" size="sm">
                  View Sessions
                </Button>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Theme</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose your preferred color scheme
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Light
                  </Button>
                  <Button variant="outline" size="sm">
                    Dark
                  </Button>
                  <Button variant="outline" size="sm">
                    System
                  </Button>
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Language</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Select your preferred language
                </p>
                <select className="px-3 py-2 bg-input border border-border rounded-md text-foreground">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">
                    Excel Integration
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Import and export data via Excel files
                  </p>
                  <Badge className="mt-1 bg-green-100 text-green-800 border-green-200">
                    Active
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">API Access</h4>
                  <p className="text-sm text-muted-foreground">
                    Connect external systems via REST API
                  </p>
                  <Badge className="mt-1 bg-gray-100 text-gray-800 border-gray-200">
                    Available
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  Setup
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">Webhooks</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive real-time notifications via webhooks
                  </p>
                  <Badge className="mt-1 bg-gray-100 text-gray-800 border-gray-200">
                    Available
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Settings className="h-8 w-8 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account, organization, and application preferences
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card className="border-border bg-card">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors text-left
                        ${
                          activeSection === section.id
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                        }
                      `}
                    >
                      <section.icon className="h-4 w-4" />
                      {section.title}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  {sections.find((s) => s.id === activeSection)?.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {activeSection === 'organization' &&
                    'Manage your organization details and preferences'}
                  {activeSection === 'profile' &&
                    'Update your personal information and contact details'}
                  {activeSection === 'permissions' &&
                    'Configure role-based access control and permissions'}
                  {activeSection === 'notifications' &&
                    'Configure how you receive notifications and alerts'}
                  {activeSection === 'security' &&
                    'Manage your account security and authentication settings'}
                  {activeSection === 'appearance' &&
                    'Customize the look and feel of your dashboard'}
                  {activeSection === 'integrations' &&
                    'Connect external tools and services'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderSectionContent()}

                {/* Save Button */}
                <div className="mt-6 pt-4 border-t border-border">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
