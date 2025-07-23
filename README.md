# RehaBingo - Professional Gaming Studio

A modern, production-ready gaming platform featuring interactive number games and Bingo with professional UI/UX design.

## 🎮 Features

### Games
- **Number Grid Game**: Interactive 1-100 number selection with betting
- **Bingo Game**: Classic 5x5 Bingo with called numbers and win detection
- **Complete Game Flow**: Join → Select Numbers → Bingo Game progression

### Professional Features
- **Modern UI/UX**: Glassmorphism design with smooth animations
- **Responsive Design**: Works perfectly on all devices
- **Game State Management**: Persistent game state with localStorage
- **Error Handling**: Comprehensive error boundaries and graceful degradation
- **Accessibility**: Keyboard navigation and ARIA labels
- **Analytics Ready**: Built-in event tracking system
- **Production Ready**: Error boundaries, loading states, and performance optimizations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd beta-sparkle-boost

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── Header.tsx      # Main navigation header
│   ├── GameCard.tsx    # Game selection cards
│   ├── Navigation.tsx  # Bottom navigation
│   ├── ErrorBoundary.tsx # Error handling
│   └── LoadingSpinner.tsx # Loading states
├── pages/              # Page components
│   ├── Index.tsx       # Main landing page
│   ├── NumberGrid.tsx  # Number selection game
│   ├── BingoGame.tsx   # Bingo game
│   └── NotFound.tsx    # 404 page
├── lib/                # Utilities and configuration
│   ├── utils.ts        # Game utilities and helpers
│   └── constants.ts    # Game constants and configuration
├── hooks/              # Custom React hooks
│   └── useGameState.ts # Game state management
└── App.tsx             # Main application component
```

## 🎯 Game Flow

1. **Home Page**: User sees game cards and features
2. **Join Game**: Click "Join Game" on any card
3. **Number Selection**: Select numbers from 1-100 grid (up to 10)
4. **Success Transition**: Beautiful modal with loading animation
5. **Bingo Game**: Play 5x5 Bingo with called numbers
6. **Win Detection**: Automatic Bingo pattern validation

## 🎨 Design System

### Colors
- **Primary**: Orange gradient system
- **Grid Colors**: Custom blue, purple, green, orange, red gradients
- **Accent**: Yellow/gold highlights
- **Background**: Dark gradient with glassmorphism effects

### Components
- **Cards**: Glassmorphism with backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Animations**: Smooth transitions and loading states
- **Typography**: Modern font hierarchy

## 🔧 Configuration

### Game Settings
```typescript
// src/lib/constants.ts
GAME_CONFIG = {
  NUMBER_GRID: {
    MIN_NUMBERS: 1,
    MAX_NUMBERS: 10,
    GRID_SIZE: 100,
  },
  BINGO: {
    GRID_SIZE: 5,
    WIN_MULTIPLIER: 2,
  },
  TIMER: {
    DEFAULT_GAME_TIME: 300, // 5 minutes
  },
}
```

### Local Storage Keys
- `rehabingo_user_balance`: User's current balance
- `rehabingo_game_history`: Game history and statistics
- `rehabingo_selected_numbers`: Selected numbers for current game
- `rehabingo_bingo_card`: Current Bingo card state

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Error Boundaries**: Production error handling

## 🚀 Production Deployment

### Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# The build output will be in the dist/ directory
```

### Environment Variables
```env
# Add to .env file for production
VITE_APP_TITLE=RehaBingo
VITE_APP_VERSION=1.0.0
```

### Performance Optimizations
- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Unused code elimination
- **Image Optimization**: Optimized assets
- **Caching**: Efficient caching strategies

## 📊 Analytics & Monitoring

### Built-in Analytics
- Game start/completion events
- Win/loss tracking
- User interaction metrics
- Performance monitoring

### Error Tracking
- Comprehensive error boundaries
- Error logging and reporting
- Graceful degradation

## 🔒 Security Features

- **Input Validation**: All user inputs validated
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Built-in protection
- **Secure Storage**: Safe localStorage usage

## 📱 Mobile Optimization

- **Responsive Design**: Works on all screen sizes
- **Touch Optimized**: Touch-friendly interactions
- **Performance**: Optimized for mobile devices
- **PWA Ready**: Progressive Web App capabilities

## 🎮 Game Features

### Number Grid Game
- Select 1-10 numbers from 1-100 grid
- Real-time selection feedback
- Progress tracking
- Bet amount calculation
- Random selection option

### Bingo Game
- 5x5 Bingo card with FREE center space
- Called numbers display
- Interactive number marking
- Win pattern detection (rows, columns, diagonals)
- Timer countdown
- Balance management

## 🔄 State Management

### Game State
- User balance and betting
- Game history and statistics
- Current game progress
- Selected numbers and Bingo cards

### Persistence
- Automatic state saving
- Game progress recovery
- User preferences storage

## 🎨 Customization

### Themes
- Dark theme with gradient backgrounds
- Customizable color schemes
- Configurable animations

### Game Rules
- Adjustable betting limits
- Configurable win multipliers
- Customizable game timers

## 📈 Future Enhancements

- [ ] Multiplayer support
- [ ] Leaderboards
- [ ] Tournament mode
- [ ] Sound effects
- [ ] More game types
- [ ] User accounts
- [ ] Real-time updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

**RehaBingo** - Professional Gaming Studio 🎮✨
