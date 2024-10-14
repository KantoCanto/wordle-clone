// Represents a single letter cell in the Wordle grid
export interface Cell {
  letter: string;
  status: "correct" | "present" | "absent"; // Status of the letter in the word
}

// Represents a row in the Wordle grid (a single word guess)
export type Row = Cell[];

// Represents the entire grid (all guesses made by the user)
export type Grid = Row[];

// Game state
export interface GameState {
  solution: string; // The word the player is trying to guess
  grid: Grid; // The current state of the guesses grid
  currentRow: number; // Index of the current row (0 to 5, assuming 6 guesses)
  gameOver: boolean; // Whether the game is over (win or lose)
  hasWon: boolean; // Whether the player has won
}

// Button component props
export interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

// Props for a single Cell in the grid
export interface CellProps {
  letter: string;
  status: "correct" | "present" | "absent";
}

// Grid component props
export interface GridProps {
  grid: Grid;
}

// Input component props for entering guesses
export interface InputProps {
  currentGuess: string;
  onChange: (newGuess: string) => void;
  onSubmit: () => void;
  isDisabled?: boolean;
}

// User guess submission
export interface Guess {
  guess: string;
  timestamp: number;
}

// Game actions (functionality to modify game state)
export interface GameActions {
  makeGuess: (guess: string) => void;
  startNewGame: () => void;
}

// Utility type for validation result
export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}
