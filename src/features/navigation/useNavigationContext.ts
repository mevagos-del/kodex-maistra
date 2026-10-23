import { useContext } from 'react';
import { NavigationContext } from './navigationContext';

export function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigationContext must be used inside NavigationProvider');
  return context;
}
