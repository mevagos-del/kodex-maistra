import { createContext } from 'react';

export type NavigationContextValue = {
  canGoBack: boolean;
  goBack: (fallback: string) => void;
};

export const NavigationContext = createContext<NavigationContextValue | null>(null);
