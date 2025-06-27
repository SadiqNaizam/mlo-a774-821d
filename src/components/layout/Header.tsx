import React from 'react';
import { Link } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b bg-background">
      <div className="container mx-auto">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors">
            <LockKeyhole className="h-6 w-6 text-primary" />
            <span>SwiftLogin</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;