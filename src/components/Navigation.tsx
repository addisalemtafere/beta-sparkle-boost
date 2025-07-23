import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card/80 backdrop-blur-sm border border-border/40 rounded-full p-2 shadow-lg">
        <div className="flex space-x-2">
          <Link to="/">
            <Button
              variant={location.pathname === '/' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-full"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link to="/number-grid">
            <Button
              variant={location.pathname === '/number-grid' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-full"
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              Grid
            </Button>
          </Link>
          <Link to="/bingo-game">
            <Button
              variant={location.pathname === '/bingo-game' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-full"
            >
              <Target className="w-4 h-4 mr-2" />
              Bingo
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}; 