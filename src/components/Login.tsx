import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Calendar, User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface LoginProps {
  onLoginSuccess: () => void;
  onNavigateToLanding: () => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      if (studentId && password) {
        toast.success('Welcome back! Redirecting to your dashboard...');
        setTimeout(() => {
          onLoginSuccess();
        }, 1000);
      } else {
        toast.error('Please enter your Student ID and password');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="bg-background relative min-h-screen overflow-hidden">
      {/* Login Card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="border-border bg-card w-full max-w-md shadow-2xl">
          {/* Brand Header */}
          <div className="px-8 pt-8 pb-6 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C3002F]">
                <Calendar className="h-7 w-7 text-white" />
              </div>
            </div>
            <h1 className="text-foreground mb-2 text-3xl">
              Welcome Back, Student.
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your custom ICS feeds and event subscriptions.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8">
            <div className="space-y-5">
              {/* Student ID Input */}
              <div>
                <Label
                  htmlFor="studentId"
                  className="text-foreground mb-2 block"
                >
                  Student ID
                </Label>
                <div className="relative">
                  <User className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
                  <Input
                    id="studentId"
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter your Student ID (e.g., 2001xxxx)"
                    className="border-input bg-background h-12 pl-11"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <Label
                  htmlFor="password"
                  className="text-foreground mb-2 block"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="border-input bg-background h-12 pr-11 pl-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="remember"
                    className="text-foreground cursor-pointer text-sm"
                  >
                    Save Student ID
                  </Label>
                </div>
                <a
                  href="#forgot"
                  className="text-sm text-[#C3002F] hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full bg-[#C3002F] text-lg text-white hover:bg-[#A00025]"
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
