import { Calendar, LayoutDashboard, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';
import { useAuthStore } from '../store/auth';

export function Navigation() {
  const { isAuthenticated, logout } = useAuthStore();
  return (
    <nav className="border-border bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="text-foreground flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C3002F]">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold">두구두구</span>
          </Link>

          <div className="flex items-center gap-6">
            {/* <a
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a> */}
            {/* <a
              href="#faq"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </a> */}

            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Link to="/events">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Browse Events
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Link to="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="border-input text-foreground hover:bg-accent"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Link to="/events">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Browse Events
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-[#C3002F] text-[#C3002F] hover:bg-[#C3002F] hover:text-white"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
