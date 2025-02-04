import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// User related atoms
export interface User {
  id: string;
  email: string;
  role: string;
}

export const userAtom = atomWithStorage<User | null>('user', null);

// Auth related atoms
export const isAuthenticatedAtom = atom(
  (get) => get(userAtom) !== null
);

// Theme related atoms
export interface ThemeConfig {
  mode: 'light' | 'dark';
  primaryColor: string;
}

export const themeAtom = atomWithStorage<ThemeConfig>('theme', {
  mode: 'light',
  primaryColor: '#1890ff'
});

// Loading state atom
export const loadingAtom = atom<boolean>(false);

// Error state atom
export interface ErrorState {
  message: string;
  code?: string;
}

export const errorAtom = atom<ErrorState | null>(null);
