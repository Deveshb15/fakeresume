
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40">
        <div className="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-medium text-foreground/90 hover:text-foreground transition-colors"
          >
            ResumeCraft
          </Link>
          <nav className="flex items-center space-x-6">
            <NavLink to="/" current={location.pathname === "/"}>
              Create
            </NavLink>
            <NavLink to="/about" current={location.pathname === "/about"}>
              About
            </NavLink>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6 animate-fade-in">
        {children}
      </main>
      
      <footer className="border-t border-border/40 py-6 backdrop-blur-md bg-background/80">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ResumeCraft. All rights reserved.</p>
          <p className="mt-1">Designed with precision.</p>
        </div>
      </footer>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  current: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, current, children }) => {
  return (
    <Link
      to={to}
      className={`relative px-1 py-2 text-sm font-medium transition-colors ${
        current 
          ? "text-foreground" 
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
      {current && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in" />
      )}
    </Link>
  );
};

export default Layout;
