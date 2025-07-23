import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Game utilities
export const generateRandomNumbers = (min: number, max: number, count: number): number[] => {
  const numbers: number[] = [];
  while (numbers.length < count) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }
  return numbers.sort((a, b) => a - b);
};

export const generateBingoCard = (): number[][] => {
  const card: number[][] = [];
  const ranges = [
    [1, 15],   // B
    [16, 30],  // I
    [31, 45],  // N
    [46, 60],  // G
    [61, 75]   // O
  ];

  for (let row = 0; row < 5; row++) {
    card[row] = [];
    for (let col = 0; col < 5; col++) {
      if (row === 2 && col === 2) {
        card[row][col] = 0; // FREE space
      } else {
        const [min, max] = ranges[col];
        const availableNumbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);
        const usedNumbers = card.map(r => r[col]).filter(n => n !== 0);
        const remainingNumbers = availableNumbers.filter(n => !usedNumbers.includes(n));
        const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
        card[row][col] = remainingNumbers[randomIndex];
      }
    }
  }
  return card;
};

export const formatCurrency = (amount: number, currency: string = 'Br'): string => {
  return `${amount.toLocaleString()} ${currency}`;
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const validateBingoWin = (markedNumbers: Set<string>, bingoCard: number[][]): boolean => {
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

export const generateGameId = (): string => {
  return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const calculateWinnings = (betAmount: number, multiplier: number = 2): number => {
  return betAmount * multiplier;
};

// Local storage utilities
export const saveGameState = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
};

export const loadGameState = (key: string): any => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load game state:', error);
    return null;
  }
};

export const clearGameState = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to clear game state:', error);
  }
};

// Sound utilities
export const playSound = (soundType: 'click' | 'win' | 'lose' | 'tick'): void => {
  // In a real implementation, you would load and play audio files
  console.log(`Playing sound: ${soundType}`);
};

// Analytics utilities
export const trackGameEvent = (event: string, data?: any): void => {
  // In a real implementation, you would send analytics data
  console.log(`Game event: ${event}`, data);
};

// Error handling
export const handleGameError = (error: Error, context: string): void => {
  console.error(`Game error in ${context}:`, error);
  // In production, you might want to send this to an error tracking service
};
