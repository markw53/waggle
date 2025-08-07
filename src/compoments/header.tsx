// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../compoments/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../compoments/ui/avatar";
import {
  User,
  Calendar,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  PawPrint,
} from "lucide-react";
import useAuth from "../compoments/hooks/useAuth";
import { ThemeToggle } from "../compoments/ui/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../compoments/ui/dropdown-menu";
// import type { User as AppUser } from "../types/user";

const Header: React.FC = () => {
  const auth = useAuth() as {
    isAuthenticated?: boolean;
    user?: { displayName?: string; email?: string; photoURL?: string };
    logout?: () => Promise<void>;
    isSiteAdmin?: boolean;
  };
  const {
    isAuthenticated = false,
    user = undefined,
    logout = async () => {},
    isSiteAdmin = false,
  } = auth || {};
  // const location = useLocation();
  
  // Optional: if you want to fetch real-time changes for user data, set up a Firestore listener here.

  const getAvatarFallback = () => {
    const name = user?.displayName || user?.email || "U";
    const initials: string = name
      .split(" ")
      .map((word: string) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return initials;
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      <div className="backdrop-blur-md bg-background/90 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Waggle Logo/Branding */}
            <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-primary waggle-logo-text">
              <PawPrint className="inline h-7 w-7 text-accent" aria-hidden="true" />
              <span>Waggle</span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* Large screen navigation */}
                  <div className="hidden md:flex space-x-1">
                    <Button variant="ghost" asChild>
                      <Link to="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                      <Link to="/matches">
                        <PawPrint className="mr-2 h-4 w-4" />
                        Matches
                      </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                      <Link to="/dogs">
                        <User className="mr-2 h-4 w-4" />
                        My Dogs
                      </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                      <Link to="/calendar">
                        <Calendar className="mr-2 h-4 w-4" />
                        Calendar
                      </Link>
                    </Button>
                    {isSiteAdmin && (
                      <Button variant="ghost" asChild>
                        <Link to="/admin">
                          <ShieldCheck className="mr-2 h-4 w-4" />
                          Admin
                        </Link>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                    <ThemeToggle />
                  </div>
                  {/* User/Avatar menu (all screens), mobile only for main nav */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary transition-all ml-2">
                        {user?.photoURL ? (
                          <AvatarImage
                            src={user.photoURL}
                            alt={user.displayName || user.email || "User"}
                          />
                        ) : (
                          <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                        )}
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuLabel className="font-bold py-2 text-center border-b text-primary">
                        My Account
                      </DropdownMenuLabel>
                      <div className="p-2">
                        <DropdownMenuItem asChild>
                          <Link to="/profile" className="flex items-center w-full">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/dogs" className="flex items-center w-full">
                            <PawPrint className="mr-2 h-4 w-4" />
                            My Dogs
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/matches" className="flex items-center w-full">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Matches
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/calendar" className="flex items-center w-full">
                            <Calendar className="mr-2 h-4 w-4" />
                            Calendar
                          </Link>
                        </DropdownMenuItem>
                        {isSiteAdmin && (
                          <DropdownMenuItem asChild>
                            <Link to="/admin" className="flex items-center w-full">
                              <ShieldCheck className="mr-2 h-4 w-4" />
                              Admin Dashboard
                            </Link>
                          </DropdownMenuItem>
                        )}
                      </div>
                      <DropdownMenuSeparator />
                      <div className="py-2">
                        <ThemeToggle showLabel className="rounded-md w-full" />
                      </div>
                      <DropdownMenuSeparator />
                      <div className="p-2">
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="py-2 hover:bg-destructive/10 rounded-md cursor-pointer"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <div className="hidden md:flex items-center space-x-4">
                    <Button variant="ghost" asChild>
                      <Link to="/auth/login">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/auth/signup">Sign Up</Link>
                    </Button>
                  </div>
                  {/* Mobile menu with ThemeToggle */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="md:hidden">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="p-2 space-y-2">
                        <DropdownMenuItem asChild>
                          <Link to="/auth/login" className="w-full">
                            Login
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/auth/signup" className="w-full">
                            Sign Up
                          </Link>
                        </DropdownMenuItem>
                      </div>
                      <DropdownMenuSeparator />
                      <div className="py-2">
                        <ThemeToggle className="rounded-md w-full" />
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <ThemeToggle className="hidden md:block" />
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;