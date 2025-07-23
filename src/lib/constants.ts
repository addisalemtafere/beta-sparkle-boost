// Game Configuration
export const GAME_CONFIG = {
  NUMBER_GRID: {
    MIN_NUMBERS: 1,
    MAX_NUMBERS: 10,
    GRID_SIZE: 100,
    MIN_BET: 1,
    MAX_BET: 1000,
  },
  BINGO: {
    GRID_SIZE: 5,
    FREE_SPACE_ROW: 2,
    FREE_SPACE_COL: 2,
    MIN_BET: 1,
    MAX_BET: 500,
    WIN_MULTIPLIER: 2,
  },
  TIMER: {
    DEFAULT_GAME_TIME: 300, // 5 minutes
    WARNING_TIME: 60, // 1 minute warning
    TICK_INTERVAL: 1000, // 1 second
  },
  BALANCE: {
    DEFAULT_BALANCE: 1000,
    MIN_BALANCE: 0,
    MAX_BALANCE: 100000,
  },
} as const;

// Game Types
export const GAME_TYPES = {
  NUMBER_GRID: 'number-grid',
  BINGO: 'bingo',
} as const;

// Game States
export const GAME_STATES = {
  IDLE: 'idle',
  SELECTING: 'selecting',
  PLAYING: 'playing',
  PAUSED: 'paused',
  FINISHED: 'finished',
  WON: 'won',
  LOST: 'lost',
} as const;

// UI Constants
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  TRANSITION_DELAY: 2000,
  SUCCESS_DISPLAY_TIME: 2000,
  LOADING_SPINNER_SIZE: 16,
  MODAL_BACKDROP_BLUR: 'backdrop-blur-sm',
} as const;

// Color Schemes
export const COLORS = {
  PRIMARY: {
    RED: 'from-red-500 to-red-600',
    ORANGE: 'from-orange-500 to-orange-600',
    YELLOW: 'from-yellow-500 to-yellow-600',
    GREEN: 'from-green-500 to-green-600',
    BLUE: 'from-blue-500 to-blue-600',
    PURPLE: 'from-purple-500 to-purple-600',
  },
  GRID: {
    PRIMARY: 'from-grid-primary to-grid-secondary',
    SUCCESS: 'from-grid-success to-grid-accent',
    WARNING: 'from-grid-warning to-grid-danger',
  },
} as const;

// Bingo Letter Ranges
export const BINGO_RANGES = [
  { letter: 'B', min: 1, max: 15 },
  { letter: 'I', min: 16, max: 30 },
  { letter: 'N', min: 31, max: 45 },
  { letter: 'G', min: 46, max: 60 },
  { letter: 'O', min: 61, max: 75 },
] as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  GAME_STATE: 'rehabingo_game_state',
  USER_BALANCE: 'rehabingo_user_balance',
  GAME_HISTORY: 'rehabingo_game_history',
  USER_PREFERENCES: 'rehabingo_user_preferences',
  SELECTED_NUMBERS: 'rehabingo_selected_numbers',
  BINGO_CARD: 'rehabingo_bingo_card',
} as const;

// Analytics Events
export const ANALYTICS_EVENTS = {
  GAME_STARTED: 'game_started',
  GAME_COMPLETED: 'game_completed',
  GAME_WON: 'game_won',
  GAME_LOST: 'game_lost',
  NUMBER_SELECTED: 'number_selected',
  BINGO_CLAIMED: 'bingo_claimed',
  BET_PLACED: 'bet_placed',
  BALANCE_UPDATED: 'balance_updated',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  INSUFFICIENT_BALANCE: 'Insufficient balance to place bet',
  INVALID_SELECTION: 'Invalid number selection',
  GAME_ALREADY_ACTIVE: 'Game is already in progress',
  NETWORK_ERROR: 'Network error occurred',
  SAVE_FAILED: 'Failed to save game state',
  LOAD_FAILED: 'Failed to load game state',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  GAME_WON: '🎉 Congratulations! You won!',
  NUMBERS_SELECTED: 'Numbers selected successfully!',
  BET_PLACED: 'Bet placed successfully!',
  GAME_SAVED: 'Game state saved successfully!',
} as const;

// Browser Simulation
export const BROWSER_CONFIG = {
  URLS: {
    HOME: 'betapuesto.com',
    NUMBER_GRID: 'betapuesto.com/selectCartella',
    BINGO_GAME: 'betapuesto.com/gameScene',
  },
  BOOKMARKS: [
    'RehaBingo',
    'Games',
    'Leaderboard',
    'Profile',
    'Settings',
    'Help',
    'Support',
    'About',
  ],
} as const;

// Sound Effects
export const SOUND_EFFECTS = {
  CLICK: 'click',
  WIN: 'win',
  LOSE: 'lose',
  TICK: 'tick',
  SELECT: 'select',
  BINGO: 'bingo',
} as const;

// Accessibility
export const ACCESSIBILITY = {
  ARIA_LABELS: {
    NUMBER_BUTTON: 'Select number',
    BINGO_BUTTON: 'Claim Bingo',
    BACK_BUTTON: 'Back to games',
    SOUND_TOGGLE: 'Toggle sound',
  },
  KEYBOARD_KEYS: {
    ENTER: 'Enter',
    SPACE: ' ',
    ESCAPE: 'Escape',
  },
} as const; 