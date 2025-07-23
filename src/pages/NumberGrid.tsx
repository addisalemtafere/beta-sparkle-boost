import React, { useState, useEffect } from 'react';
import { ArrowLeft, Eye, Star, Download, User, Coins, Timer, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { BROWSER_CONFIG } from '@/lib/constants';

const NumberGrid: React.FC = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(0);
  const [maxSelections] = useState(10);
  const [isGameActive, setIsGameActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNumberClick = (number: number) => {
    if (isGameActive) return; // Prevent selection during active game
    
    setSelectedNumbers(prev => {
      if (prev.includes(number)) {
        return prev.filter(n => n !== number);
      } else if (prev.length < maxSelections) {
        return [...prev, number];
      }
      return prev;
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent, number: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNumberClick(number);
    }
  };

  const selectRandomNumbers = () => {
    if (isGameActive) return;
    
    const shuffled = numbers.sort(() => 0.5 - Math.random());
    const randomSelection = shuffled.slice(0, maxSelections);
    setSelectedNumbers(randomSelection);
  };

  const startGame = () => {
    if (selectedNumbers.length === 0) return;
    setIsGameActive(true);
    setBetAmount(prev => prev + selectedNumbers.length);
    setBalance(prev => prev - selectedNumbers.length);
    setShowSuccess(true);
    
    // Navigate to Bingo game after a short delay
    setTimeout(() => {
      window.location.href = '/bingo-game';
    }, 2000);
  };

  const resetGame = () => {
    setIsGameActive(false);
    setSelectedNumbers([]);
    setBetAmount(0);
    setTimeLeft(300);
  };

  const generateNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 100; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  const numbers = generateNumbers();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Browser Header Simulation */}
      <div className="bg-card/90 backdrop-blur-sm text-foreground p-2 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-muted rounded flex items-center justify-center text-xs hover:bg-muted/80 transition-colors">←</div>
            <div className="w-6 h-6 bg-muted rounded flex items-center justify-center text-xs hover:bg-muted/80 transition-colors">→</div>
            <div className="w-6 h-6 bg-muted rounded flex items-center justify-center text-xs hover:bg-muted/80 transition-colors">⟳</div>
            <div className="bg-muted/50 px-3 py-1 rounded text-sm border border-border/30">betapuesto.com/selectCartella</div>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
            <Download className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
            <User className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
            <span className="text-sm text-muted-foreground">All Bookmarks</span>
          </div>
        </div>
        
        {/* Bookmark Tabs */}
        <div className="flex space-x-1 mt-2">
          {BROWSER_CONFIG.BOOKMARKS.map((tab, index) => (
            <div key={index} className="bg-muted/60 px-3 py-1 rounded-t text-xs truncate max-w-32 border border-border/30 hover:bg-muted/80 transition-colors">
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Games</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Coins className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">{balance.toLocaleString()} Br</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Select Cartella</h1>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{betAmount} Br</div>
            <div className="text-sm text-muted-foreground">Current Bet</div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <div className="flex space-x-2">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded shadow-glow-primary">
                DEPOSIT
              </Button>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded flex items-center space-x-1 shadow-glow-accent">
                <Eye className="w-4 h-4" />
                <span>ETB...</span>
              </Button>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-10 h-10 rounded-full">
                A
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-foreground">
              <Timer className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{formatTime(timeLeft)} Taken</span>
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Selection Info */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Badge variant="outline" className="text-sm">
              <Target className="w-4 h-4 mr-2" />
              Selected: {selectedNumbers.length}/{maxSelections}
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Coins className="w-4 h-4 mr-2" />
              Cost: {selectedNumbers.length} Br
            </Badge>
          </div>
          <Progress value={(selectedNumbers.length / maxSelections) * 100} className="w-64 mx-auto" />
        </div>

        {/* Number Grid */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/40 p-6 shadow-card">
          <div className="grid grid-cols-10 gap-2 max-w-4xl mx-auto">
            {numbers.map((number) => (
                              <button
                  key={number}
                  onClick={() => handleNumberClick(number)}
                  onKeyDown={(e) => handleKeyPress(e, number)}
                  disabled={isGameActive}
                  aria-label={`Select number ${number}`}
                  aria-pressed={selectedNumbers.includes(number)}
                  className={`
                    w-12 h-12 rounded-lg border-2 transition-all duration-300 font-mono text-sm font-bold
                    focus:outline-none focus:ring-2 focus:ring-grid-primary focus:ring-offset-2 focus:ring-offset-background
                    ${selectedNumbers.includes(number)
                      ? 'bg-gradient-to-br from-grid-success to-grid-accent border-grid-accent/50 text-white shadow-lg shadow-grid-success/50 scale-105'
                      : 'bg-gradient-to-br from-card to-muted border-border text-foreground hover:from-grid-primary hover:to-grid-secondary hover:border-grid-primary/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
                    }
                  `}
                >
                  {number}
                </button>
            ))}
          </div>
        </Card>

        {/* Selected Numbers Display */}
        {selectedNumbers.length > 0 && (
          <div className="mt-6 text-center">
            <div className="text-foreground mb-2 font-semibold">
              Selected Numbers
            </div>
            <div className="text-muted-foreground text-sm max-w-2xl mx-auto">
              {selectedNumbers.sort((a, b) => a - b).join(', ')}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button 
            className="bg-gradient-to-r from-grid-success to-grid-accent hover:from-grid-success/90 hover:to-grid-accent/90 text-white px-8 py-3 rounded-lg shadow-lg shadow-grid-success/30"
            onClick={startGame}
            disabled={selectedNumbers.length === 0 || isGameActive}
          >
            <Coins className="w-5 h-5 mr-2" />
            {isGameActive ? 'Starting Bingo Game...' : `Start Game (${selectedNumbers.length} numbers)`}
          </Button>
          <Button 
            variant="outline"
            className="border-border text-foreground hover:bg-muted px-8 py-3 rounded-lg"
            onClick={() => setSelectedNumbers([])}
            disabled={isGameActive}
          >
            Clear Selection
          </Button>
          <Button 
            variant="outline"
            className="border-grid-primary text-grid-primary hover:bg-grid-primary/10 px-8 py-3 rounded-lg"
            onClick={selectRandomNumbers}
            disabled={isGameActive}
          >
            Random Select
          </Button>
          {isGameActive && (
            <Button 
              variant="destructive"
              className="px-8 py-3 rounded-lg"
              onClick={resetGame}
            >
              Reset Game
            </Button>
          )}
        </div>

                {/* Game Status */}
        {isGameActive && (
          <div className="mt-6 text-center">
            <Badge className="bg-gradient-to-r from-grid-warning to-grid-danger text-white px-4 py-2 text-lg shadow-lg">
              🎮 Game Active - Time Remaining: {formatTime(timeLeft)}
            </Badge>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-8 text-center shadow-xl animate-slide-up">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Numbers Selected!</h3>
              <p className="text-muted-foreground mb-4">
                You selected {selectedNumbers.length} numbers. Redirecting to Bingo game...
              </p>
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberGrid; 