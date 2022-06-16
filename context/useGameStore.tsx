import create from 'zustand';
import words from '../components/game/words.json';

interface GameState {
  isInGame: boolean;
  setIsInGame: (boolean: boolean) => void;
  isGameEnded: boolean;
  setIsGameEnded: (boolean: boolean) => void;
  word: string;
  getWord: () => void;
  setWord: (value: string) => void;
  input: string;
  setInput: (value: string) => void;
  answers: string[];
  setAnswers: (value: string) => void;
  removeAnswers: () => void;
  gameStartDate: number;
  setGameStartDate: (value: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  isInGame: false,
  setIsInGame: (boolean) => set(() => ({ isInGame: boolean })),
  isGameEnded: false,
  setIsGameEnded: (boolean) => set(() => ({ isGameEnded: boolean })),
  word: 'start',
  getWord: () => set(() => ({ word: words[~~(Math.random() * words.length)] })),
  setWord: (value) => set(() => ({ word: value })),
  input: '',
  setInput: (value) => set(() => ({ input: value })),
  answers: [],
  setAnswers: (value) => set((state) => ({ answers: [...state.answers, value] })),
  removeAnswers: () => set(() => ({ answers: [] })),
  gameStartDate: Date.now(),
  setGameStartDate: (date) => set(() => ({ gameStartDate: date })),
}));
