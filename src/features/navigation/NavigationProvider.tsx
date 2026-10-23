import { useEffect, useLayoutEffect, useMemo, useRef, type ReactNode } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { NavigationContext } from './navigationContext';

const scrollPositions = new Map<string, number>();

function historyIndex() {
  return (window.history.state as { idx?: number } | null)?.idx ?? 0;
}

function entryId(pathname: string) {
  return `${historyIndex()}:${pathname}`;
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const navigationTypeRef = useRef(navigationType);
  navigationTypeRef.current = navigationType;
  const navigate = useNavigate();
  const initialIndex = useRef(historyIndex());
  const currentIndex = historyIndex();
  const currentEntry = entryId(location.pathname);

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previousRestoration; };
  }, []);

  useEffect(() => {
    const rememberScroll = () => scrollPositions.set(currentEntry, window.scrollY);
    document.addEventListener('click', rememberScroll, true);
    window.addEventListener('popstate', rememberScroll);
    window.addEventListener('pagehide', rememberScroll);
    return () => {
      document.removeEventListener('click', rememberScroll, true);
      window.removeEventListener('popstate', rememberScroll);
      window.removeEventListener('pagehide', rememberScroll);
    };
  }, [currentEntry]);

  useLayoutEffect(() => {
    const target = navigationTypeRef.current === 'POP' ? scrollPositions.get(currentEntry) ?? 0 : 0;
    window.scrollTo({ top: target, left: 0, behavior: 'instant' });
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: target, left: 0, behavior: 'instant' });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [currentEntry]);

  const value = useMemo(() => ({
    canGoBack: currentIndex > initialIndex.current,
    goBack: (fallback: string) => {
      if (historyIndex() > initialIndex.current) navigate(-1);
      else navigate(fallback, { replace: true });
    },
  }), [currentIndex, navigate]);

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}
