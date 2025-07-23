import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Download, User, Volume2, Clock, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface BingoNumber {
  letter: string;
  number: number;
  called: boolean;
}

const BingoGame: React.FC = () => {
  const [balance, setBalance] = useState(10);
  const [totalCalls, setTotalCalls] = useState(2);
  const [betAmount, setBetAmount] = useState(16);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [calledNumbers, setCalledNumbers] = useState<BingoNumber[]>([
    { letter: 'B', number: 6, called: true },
    { letter: 'I', number: 23, called: true }
  ]);
  const [bingoCard, setBingoCard] = useState<number[][]>([
    [2, 7, 5, 11, 10],
    [19, 29, 26, 24, 30],
    [41, 39, 0, 38, 31], // 0 represents FREE space
    [48, 46, 49, 57, 47],
    [63, 73, 71, 65, 68]
  ]);
  const [markedNumbers, setMarkedNumbers] = useState<Set<string>>(new Set());
  const [cardNumber] = useState(6);
  const [isGameActive, setIsGameActive] = useState(true);

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

  const handleNumberClick = (row: number, col: number) => {
    if (!isGameActive) return;
    
    const number = bingoCard[row][col];
    if (number === 0) return; // FREE space can't be marked
    
    const key = `${row}-${col}`;
    setMarkedNumbers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const checkBingo = () => {
    // Check rows
    for (let row = 0; row < 5; row++) {
      let rowComplete = true;
      for (let col = 0; col < 5; col++) {
        const key = `${row}-${col}`;
        if (col === 2 && row === 2) continue; // FREE space
        if (!markedNumbers.has(key)) {
          rowComplete = false;
          break;
        }
      }
      if (rowComplete) return true;
    }

    // Check columns
    for (let col = 0; col < 5; col++) {
      let colComplete = true;
      for (let row = 0; row < 5; row++) {
        const key = `${row}-${col}`;
        if (col === 2 && row === 2) continue; // FREE space
        if (!markedNumbers.has(key)) {
          colComplete = false;
          break;
        }
      }
      if (colComplete) return true;
    }

    // Check diagonals
    let diagonal1Complete = true;
    let diagonal2Complete = true;
    
    for (let i = 0; i < 5; i++) {
      if (i === 2) continue; // FREE space
      if (!markedNumbers.has(`${i}-${i}`)) diagonal1Complete = false;
      if (!markedNumbers.has(`${i}-${4-i}`)) diagonal2Complete = false;
    }
    
    return diagonal1Complete || diagonal2Complete;
  };

  const handleBingoClick = () => {
    if (checkBingo()) {
      alert('🎉 BINGO! You won!');
      setBalance(prev => prev + betAmount * 2);
    } else {
      alert('❌ Not a valid Bingo! Keep trying!');
    }
  };

  const isNumberCalled = (number: number, col: number) => {
    const letter = ['B', 'I', 'N', 'G', 'O'][col];
    return calledNumbers.some(cn => cn.letter === letter && cn.number === number);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Browser Header Simulation */}
      <div className="bg-card/90 backdrop-blur-sm text-foreground p-2 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-muted rounded flex items-center justify-center text-xs hover:bg-muted/80 transition-colors">←</div>
            <div className="w-6 h-6 bg-muted rounded flex items-center justify-center text-xs hover:bg-muted/80 transition-colors">→</div>
            <div className="w-6 h-6 bg-muted rounded flex items-center justify-center text-xs hover:bg-muted/80 transition-colors">⟳</div>
            <div className="bg-muted/50 px-3 py-1 rounded text-sm border border-border/30">betapuesto.com/gameScene</div>
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
          {['javacode', 'Microservice', 'Best article', 'How to upload a file from...', '{EA} Add Git Ignore to existing...', 'convix', 'Angular 2 - Async Validator...', 'german'].map((tab, index) => (
            <div key={index} className="bg-muted/60 px-3 py-1 rounded-t text-xs truncate max-w-32 border border-border/30 hover:bg-muted/80 transition-colors">
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Main Game Content */}
      <div className="p-6">
        {/* Top Information Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Games</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Coins className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">{balance} Br</span>
            </div>
            <Badge variant="outline" className="text-sm">
              Total call: {totalCalls}
            </Badge>
          </div>
          
          {/* Called Numbers Display */}
          <div className="flex items-center space-x-4">
            {calledNumbers.map((called, index) => (
              <div
                key={index}
                className={`w-16 h-16 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-lg ${
                  index === 0 ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-yellow-500 to-yellow-600'
                }`}
              >
                <div className="text-xs">{called.letter}</div>
                <div className="text-lg">{called.number}</div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{betAmount} Br</div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span className="text-lg font-mono font-bold text-foreground">{formatTime(timeLeft)}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Bingo Card */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/40 p-6 shadow-card max-w-2xl mx-auto">
          {/* BINGO Header */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {[
              { letter: 'B', color: 'from-red-500 to-red-600' },
              { letter: 'I', color: 'from-orange-500 to-orange-600' },
              { letter: 'N', color: 'from-yellow-500 to-yellow-600' },
              { letter: 'G', color: 'from-green-500 to-green-600' },
              { letter: 'O', color: 'from-blue-500 to-blue-600' }
            ].map((item, index) => (
              <div
                key={item.letter}
                className={`bg-gradient-to-br ${item.color} text-white font-black text-2xl py-4 rounded-xl flex items-center justify-center shadow-xl border-2 border-white/20 transform hover:scale-105 transition-all duration-300`}
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                {item.letter}
              </div>
            ))}
          </div>

          {/* Bingo Grid */}
          <div className="grid grid-cols-5 gap-1">
            {bingoCard.map((row, rowIndex) =>
              row.map((number, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleNumberClick(rowIndex, colIndex)}
                  disabled={!isGameActive}
                  className={`
                    w-16 h-16 rounded-lg border-2 transition-all duration-300 font-mono text-lg font-bold
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
                    ${number === 0
                      ? 'bg-gradient-to-br from-green-500 to-green-600 text-white border-green-400 cursor-default'
                      : markedNumbers.has(`${rowIndex}-${colIndex}`)
                      ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-primary/50 shadow-glow-primary scale-105'
                      : isNumberCalled(number, colIndex)
                      ? 'bg-gradient-to-br from-accent to-accent/80 text-accent-foreground border-accent/50'
                      : 'bg-card border-border text-foreground hover:bg-muted hover:border-primary/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
                    }
                  `}
                >
                  {number === 0 ? 'FREE' : number}
                </button>
              ))
            )}
          </div>
        </Card>

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-8 max-w-2xl mx-auto">
          <div className="text-foreground font-semibold">
            CARD NO. {cardNumber}
          </div>
          
          <Button
            onClick={handleBingoClick}
            disabled={!isGameActive}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg shadow-lg text-lg font-bold"
          >
            🎯 BINGO
          </Button>
        </div>

        {/* Game Instructions */}
        <div className="mt-8 text-center text-muted-foreground max-w-2xl mx-auto">
          <p className="text-sm">
            Click on called numbers to mark them. Get 5 in a row (horizontal, vertical, or diagonal) to win!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BingoGame; 