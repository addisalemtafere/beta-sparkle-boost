import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Coins, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
  amount: number;
  winAmount: number;
  timeLeft: string;
  delay?: number;
}

export const GameCard = ({ amount, winAmount, timeLeft, delay = 0 }: GameCardProps) => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleJoinGame = () => {
    // Navigate to number grid for number selection
    navigate('/number-grid');
  };

  return (
    <Card 
      className={`bg-gradient-card border-border/40 hover:border-accent/60 transition-all duration-500 hover:shadow-card hover:scale-[1.02] group ${
        mounted ? 'animate-slide-up' : 'opacity-0'
      }`}
    >
      <CardContent className="p-6 space-y-4">
        {/* Amount Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">{amount}</span>
            </div>
            <span className="text-muted-foreground text-sm">Br Game</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground block">ባለ {amount} ብር ጨዋታ</span>
          </div>
        </div>

        {/* Win Amount */}
        <div className="text-center py-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-accent" />
            <span className="text-accent font-semibold">Win Amount</span>
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">
            {winAmount}<span className="text-accent">Br</span>
          </div>
        </div>

        {/* Timer */}
        <div className="bg-muted/30 rounded-lg p-4 backdrop-blur-sm border border-border/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Time Remaining</span>
          </div>
          <div className="text-center">
            <span className="text-2xl font-mono font-bold text-foreground animate-timer-pulse">
              {timeLeft}
            </span>
          </div>
        </div>

        {/* Join Button */}
        <Button 
          variant="game" 
          size="xl" 
          className="w-full group-hover:animate-pulse-glow"
          onClick={handleJoinGame}
        >
          <Coins className="w-5 h-5" />
          Join Game
        </Button>
      </CardContent>
    </Card>
  );
};