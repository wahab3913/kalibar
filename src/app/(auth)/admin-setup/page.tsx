'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import AuthBackground from '../AuthBackground';
import Link from 'next/link';
import {
  BarChart3,
  Building,
  Shield,
  CheckCircle,
  ArrowRight,
  Crown,
} from 'lucide-react';

type Step = 'organization' | 'admin-account' | 'preferences' | 'complete';

export default function AdminSetupPage() {
  const [currentStep, setCurrentStep] = useState<Step>('organization');
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationSize: '',
    industry: '',
    adminName: '',
    adminEmail: '',
    adminPassword: '',
    timezone: '',
    currency: 'USD',
  });

  const steps = [
    { id: 'organization', title: 'Organization', icon: Building },
    { id: 'admin-account', title: 'Admin Account', icon: Crown },
    { id: 'preferences', title: 'Preferences', icon: Shield },
    { id: 'complete', title: 'Complete', icon: CheckCircle },
  ];

  const handleNext = () => {
    const stepOrder: Step[] = [
      'organization',
      'admin-account',
      'preferences',
      'complete',
    ];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const stepOrder: Step[] = [
      'organization',
      'admin-account',
      'preferences',
      'complete',
    ];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'organization':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orgName" className="text-foreground">
                Organization Name
              </Label>
              <Input
                id="orgName"
                placeholder="Acme Delivery Co."
                value={formData.organizationName}
                onChange={(e) =>
                  setFormData({ ...formData, organizationName: e.target.value })
                }
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orgSize" className="text-foreground">
                Organization Size
              </Label>
              <select
                id="orgSize"
                value={formData.organizationSize}
                onChange={(e) =>
                  setFormData({ ...formData, organizationSize: e.target.value })
                }
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-foreground">
                Industry
              </Label>
              <select
                id="industry"
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                <option value="">Select industry</option>
                <option value="food-delivery">Food Delivery</option>
                <option value="package-delivery">Package Delivery</option>
                <option value="logistics">Logistics & Freight</option>
                <option value="ride-sharing">Ride Sharing</option>
                <option value="field-services">Field Services</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        );

      case 'admin-account':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminName" className="text-foreground">
                Full Name
              </Label>
              <Input
                id="adminName"
                placeholder="John Smith"
                value={formData.adminName}
                onChange={(e) =>
                  setFormData({ ...formData, adminName: e.target.value })
                }
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminEmail" className="text-foreground">
                Email Address
              </Label>
              <Input
                id="adminEmail"
                type="email"
                placeholder="admin@company.com"
                value={formData.adminEmail}
                onChange={(e) =>
                  setFormData({ ...formData, adminEmail: e.target.value })
                }
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminPassword" className="text-foreground">
                Password
              </Label>
              <Input
                id="adminPassword"
                type="password"
                placeholder="Create a strong password"
                value={formData.adminPassword}
                onChange={(e) =>
                  setFormData({ ...formData, adminPassword: e.target.value })
                }
                className="bg-input border-border text-foreground"
              />
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-foreground">
                Timezone
              </Label>
              <select
                id="timezone"
                value={formData.timezone}
                onChange={(e) =>
                  setFormData({ ...formData, timezone: e.target.value })
                }
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                <option value="">Select timezone</option>
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-foreground">
                Currency
              </Label>
              <select
                id="currency"
                value={formData.currency}
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value })
                }
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
              </select>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Setup Complete!
              </h3>
              <p className="text-muted-foreground">
                Your organization "{formData.organizationName}" has been created
                successfully. You can now access your dashboard and start
                managing your operations.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-left">
              <h4 className="font-medium text-foreground mb-2">What's Next?</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Upload your first data set</li>
                <li>• Invite team members</li>
                <li>• Configure role permissions</li>
                <li>• Explore AI insights</li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <AuthBackground>
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4 text-primary-foreground">
            <BarChart3 className="h-8 w-8 text-primary-foreground" />
            <span className="text-2xl font-bold text-primary-foreground">
              Kalibur
            </span>
          </div>
          <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 mb-4">
            <Crown className="h-3 w-3 mr-1" />
            Super Admin Setup
          </Badge>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted =
                steps.findIndex((s) => s.id === currentStep) > index;
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors
                    ${
                      isActive
                        ? 'bg-primary-foreground text-primary border-primary-foreground'
                        : isCompleted
                        ? 'bg-green-500 text-primary-foreground border-green-500'
                        : 'bg-transparent text-primary-foreground/60 border-primary-foreground/30'
                    }
                  `}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`
                      w-16 h-0.5 mx-2 transition-colors
                       ${
                         isCompleted
                           ? 'bg-green-500'
                           : 'bg-primary-foreground/30'
                       }
                    `}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Card */}
        <Card className="border-border bg-card shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">
              {steps.find((s) => s.id === currentStep)?.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {currentStep === 'organization' &&
                'Set up your organization details'}
              {currentStep === 'admin-account' &&
                'Create your super admin account'}
              {currentStep === 'preferences' && 'Configure system preferences'}
              {currentStep === 'complete' && 'Your organization is ready to go'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 'organization'}
                className="border-border text-foreground"
              >
                Previous
              </Button>

              {currentStep === 'complete' ? (
                <Link href="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  {currentStep === 'preferences' ? 'Complete Setup' : 'Next'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthBackground>
  );
}
