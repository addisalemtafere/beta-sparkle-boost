import { useState, useEffect, useCallback } from 'react';
import { 
  saveGameState, 
  loadGameState, 
  clearGameState,
  trackGameEvent,
  handleGameError 
} from '@/lib/utils';
import { 
  STORAGE_KEYS, 
  GAME_CONFIG, 
  ANALYTICS_EVENTS,
  ERROR_MESSAGES 
} from '@/lib/constants';

interface GameState {
  balance: number;
  gameHistory: GameHistoryItem[];
  selectedNumbers: number[];
  bingoCard: number[][];
  currentGameId: string | null;
  gameState: 'idle' | 'selecting' | 'playing' | 'paused' | 'finished' | 'won' | 'lost';
}

interface GameHistoryItem {
  id: string;
  type: 'number-grid' | 'bingo';
  betAmount: number;
  winAmount: number;
  timestamp: number;
  won: boolean;
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    balance: GAME_CONFIG.BALANCE.DEFAULT_BALANCE,
    gameHistory: [],
    selectedNumbers: [],
    bingoCard: [],
    currentGameId: null,
    gameState: 'idle',
  });

  // Load initial state from localStorage
  useEffect(() => {
    try {
      const savedBalance = loadGameState(STORAGE_KEYS.USER_BALANCE);
      const savedHistory = loadGameState(STORAGE_KEYS.GAME_HISTORY);
      const savedNumbers = loadGameState(STORAGE_KEYS.SELECTED_NUMBERS);
      const savedCard = loadGameState(STORAGE_KEYS.BINGO_CARD);

      setGameState(prev => ({
        ...prev,
        balance: savedBalance || GAME_CONFIG.BALANCE.DEFAULT_BALANCE,
        gameHistory: savedHistory || [],
        selectedNumbers: savedNumbers || [],
        bingoCard: savedCard || [],
      }));
    } catch (error) {
      handleGameError(error as Error, 'useGameState initialization');
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    try {
      saveGameState(STORAGE_KEYS.USER_BALANCE, gameState.balance);
      saveGameState(STORAGE_KEYS.GAME_HISTORY, gameState.gameHistory);
      saveGameState(STORAGE_KEYS.SELECTED_NUMBERS, gameState.selectedNumbers);
      saveGameState(STORAGE_KEYS.BINGO_CARD, gameState.bingoCard);
    } catch (error) {
      handleGameError(error as Error, 'useGameState save');
    }
  }, [gameState.balance, gameState.gameHistory, gameState.selectedNumbers, gameState.bingoCard]);

  const updateBalance = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      balance: Math.max(0, Math.min(GAME_CONFIG.BALANCE.MAX_BALANCE, prev.balance + amount)),
    }));
    trackGameEvent(ANALYTICS_EVENTS.BALANCE_UPDATED, { amount, newBalance: gameState.balance + amount });
  }, [gameState.balance]);

  const placeBet = useCallback((amount: number) => {
    if (amount > gameState.balance) {
      throw new Error(ERROR_MESSAGES.INSUFFICIENT_BALANCE);
    }
    
    updateBalance(-amount);
    trackGameEvent(ANALYTICS_EVENTS.BET_PLACED, { amount });
    return amount;
  }, [gameState.balance, updateBalance]);

  const addWin = useCallback((amount: number) => {
    updateBalance(amount);
    trackGameEvent(ANALYTICS_EVENTS.GAME_WON, { amount });
  }, [updateBalance]);

  const addGameToHistory = useCallback((gameData: Omit<GameHistoryItem, 'id' | 'timestamp'>) => {
    const newGame: GameHistoryItem = {
      ...gameData,
      id: `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };

    setGameState(prev => ({
      ...prev,
      gameHistory: [newGame, ...prev.gameHistory.slice(0, 49)], // Keep last 50 games
    }));
  }, []);

  const setSelectedNumbers = useCallback((numbers: number[]) => {
    setGameState(prev => ({
      ...prev,
      selectedNumbers: numbers,
    }));
    trackGameEvent(ANALYTICS_EVENTS.NUMBER_SELECTED, { count: numbers.length });
  }, []);

  const setBingoCard = useCallback((card: number[][]) => {
    setGameState(prev => ({
      ...prev,
      bingoCard: card,
    }));
  }, []);

  const setGameStateStatus = useCallback((status: GameState['gameState']) => {
    setGameState(prev => ({
      ...prev,
      gameState: status,
    }));
  }, []);

  const setCurrentGameId = useCallback((gameId: string | null) => {
    setGameState(prev => ({
      ...prev,
      currentGameId: gameId,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      selectedNumbers: [],
      bingoCard: [],
      currentGameId: null,
      gameState: 'idle',
    }));
    clearGameState(STORAGE_KEYS.SELECTED_NUMBERS);
    clearGameState(STORAGE_KEYS.BINGO_CARD);
  }, []);

  const getGameStats = useCallback(() => {
    const totalGames = gameState.gameHistory.length;
    const wonGames = gameState.gameHistory.filter(game => game.won).length;
    const totalWinnings = gameState.gameHistory
      .filter(game => game.won)
      .reduce((sum, game) => sum + game.winAmount, 0);
    const totalBets = gameState.gameHistory.reduce((sum, game) => sum + game.betAmount, 0);

    return {
      totalGames,
      wonGames,
      winRate: totalGames > 0 ? (wonGames / totalGames) * 100 : 0,
      totalWinnings,
      totalBets,
      netProfit: totalWinnings - totalBets,
    };
  }, [gameState.gameHistory]);

  return {
    ...gameState,
    updateBalance,
    placeBet,
    addWin,
    addGameToHistory,
    setSelectedNumbers,
    setBingoCard,
    setGameStateStatus,
    setCurrentGameId,
    resetGame,
    getGameStats,
  };
}; 