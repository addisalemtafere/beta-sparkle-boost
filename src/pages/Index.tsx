import { Header } from '@/components/Header';
import { GameCard } from '@/components/GameCard';
import { Star, Zap, Shield, Trophy, Grid3X3, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const gameData = [
  { amount: 10, winAmount: 0, timeLeft: "00:00", delay: 0 },
  { amount: 20, winAmount: 0, timeLeft: "00:00", delay: 100 },
  { amount: 50, winAmount: 0, timeLeft: "00:00", delay: 200 },
  { amount: 100, winAmount: 0, timeLeft: "00:00", delay: 300 },
  { amount: 250, winAmount: 0, timeLeft: "00:00", delay: 400 },
  { amount: 500, winAmount: 0, timeLeft: "00:00", delay: 500 },
  { amount: 1000, winAmount: 0, timeLeft: "00:00", delay: 600 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      


      {/* Games Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Game
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Select your betting amount and join the excitement
            </p>
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {[
              { icon: Zap, text: "Instant Play" },
              { icon: Shield, text: "Secure Gaming" },
              { icon: Trophy, text: "Big Rewards" },
              { icon: Star, text: "Premium Experience" }
            ].map((feature, index) => (
              <div 
                key={feature.text}
                className={`flex items-center gap-2 text-accent font-medium animate-slide-up bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/30`}
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <feature.icon className="w-5 h-5" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {gameData.map((game) => (
              <GameCard 
                key={game.amount}
                amount={game.amount}
                winAmount={game.winAmount}
                timeLeft={game.timeLeft}
                delay={game.delay}
              />
            ))}
            
            {/* Number Grid Game Card */}
            <Link to="/number-grid" className="block">
              <div className="bg-card hover:bg-card/80 border border-border rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Grid3X3 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Number Grid</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Select numbers from 1-100 grid
                    </p>
                    <div className="text-2xl font-bold text-accent">Interactive</div>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Bingo Game Card */}
            <Link to="/bingo-game" className="block">
              <div className="bg-card hover:bg-card/80 border border-border rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Bingo Game</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Classic 5x5 Bingo with called numbers
                    </p>
                    <div className="text-2xl font-bold text-accent">Classic</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section - Moved Below Games */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-12 space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-slide-up">
              RehaBingo
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Experience the thrill of premium gaming with instant wins and exciting rewards
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 RehaBingo. All rights reserved. | 
            <span className="text-accent"> Play Responsibly</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
