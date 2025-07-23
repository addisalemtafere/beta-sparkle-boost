import { Header } from '@/components/Header';
import { GameCard } from '@/components/GameCard';
import { Star, Zap, Shield, Trophy } from 'lucide-react';

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
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-12 space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-slide-up">
              RehaBingo
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Experience the thrill of premium gaming with instant wins and exciting rewards
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              {[
                { icon: Zap, text: "Instant Play" },
                { icon: Shield, text: "Secure Gaming" },
                { icon: Trophy, text: "Big Rewards" },
                { icon: Star, text: "Premium Experience" }
              ].map((feature, index) => (
                <div 
                  key={feature.text}
                  className={`flex items-center gap-2 text-accent font-medium animate-slide-up`}
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  <feature.icon className="w-5 h-5" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Game
            </h2>
            <p className="text-muted-foreground text-lg">
              Select your betting amount and join the excitement
            </p>
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
