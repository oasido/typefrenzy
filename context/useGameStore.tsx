import create from 'zustand';
import words from '../components/game/words.json';

interface GameState {
  isStarted: boolean;
  setIsStarted: (boolean: boolean) => void;
  word: string | null;
  getWord: () => void;
  input: string;
  setInput: (value: string) => void;
  answers: string[];
  setAnswers: (value: string) => void;
  removeAnswers: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  isStarted: false,
  setIsStarted: (boolean) => set(() => ({ isStarted: boolean })),
  word: null,
  getWord: () => set(() => ({ word: words[~~(Math.random() * words.length)] })),
  input: '',
  setInput: (value) => set(() => ({ input: value })),
  answers: [],
  setAnswers: (value) => set((state) => ({ answers: [...state.answers, value] })),
  removeAnswers: () => set(() => ({ answers: [] })),
}));
