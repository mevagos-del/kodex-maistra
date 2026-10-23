import { useCallback, useState, type Dispatch, type SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';

const routeState = new Map<string, unknown>();

function historyIndex() {
  return (window.history.state as { idx?: number } | null)?.idx ?? 0;
}

export function useRouteSessionState<T>(namespace: string, initialValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  const { pathname } = useLocation();
  const key = `${historyIndex()}:${pathname}:${namespace}`;
  const [value, setValue] = useState<T>(() => {
    if (routeState.has(key)) return routeState.get(key) as T;
    return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
  });

  const setSessionValue = useCallback<Dispatch<SetStateAction<T>>>((next) => {
    setValue((current) => {
      const resolved = typeof next === 'function' ? (next as (value: T) => T)(current) : next;
      routeState.set(key, resolved);
      return resolved;
    });
  }, [key]);

  return [value, setSessionValue];
}
