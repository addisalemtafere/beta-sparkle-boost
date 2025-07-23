import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, LogIn, Globe, Wallet } from 'lucide-react';

export const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <header className="bg-gradient-card border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">R</span>
            </div>
            <h1 className="text-2xl font-bold">
              <span className="text-foreground">Reha</span>
              <span className="text-primary">Bingo</span>
            </h1>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language Selector */}
            <Select defaultValue="am">
              <SelectTrigger className="w-32 bg-muted/50 border-border/60">
                <Globe className="w-4 h-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border/60">
                <SelectItem value="am">አማርኛ</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>

            {/* Balance */}
            <div className="flex items-center gap-2 bg-muted/30 px-4 py-2 rounded-lg border border-border/30">
              <Wallet className="w-4 h-4 text-accent" />
              <span className="font-semibold text-foreground">0 Br</span>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {/* Login Dialog */}
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button variant="premium" size="lg">
                  <LogIn className="w-4 h-4" />
                  መግቢያ
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border/60 max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl text-center">Login</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com"
                      className="bg-muted/30 border-border/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password"
                      className="bg-muted/30 border-border/60"
                    />
                  </div>
                  <Button variant="game" className="w-full" size="lg">
                    ግባ
                  </Button>
                  <div className="text-center">
                    <Button variant="link" className="text-muted-foreground text-sm">
                      የይለፍ ቃል ረስቻለው
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Register Dialog */}
            <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
              <DialogTrigger asChild>
                <Button variant="game">
                  <User className="w-4 h-4" />
                  መዝገቡ
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border/60 max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl text-center">Register</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input 
                      id="reg-email" 
                      type="email" 
                      placeholder="your@email.com"
                      className="bg-muted/30 border-border/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input 
                      id="reg-password" 
                      type="password"
                      className="bg-muted/30 border-border/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password"
                      className="bg-muted/30 border-border/60"
                    />
                  </div>
                  <Button variant="game" className="w-full" size="lg">
                    መመዝገቢያ
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
};