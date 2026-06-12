import { useEffect, useState } from 'react';

export type AsyncDataState<T> = {
  data: T;
  isLoading: boolean;
  errorMessage: string | null;
};

export function useAsyncData<T>(loader: () => Promise<T>, initialData: T, dependencies: unknown[] = []) {
  const [state, setState] = useState<AsyncDataState<T>>({
    data: initialData,
    isLoading: true,
    errorMessage: null,
  });

  useEffect(() => {
    let isMounted = true;

    setState((current) => ({ ...current, isLoading: true, errorMessage: null }));

    loader()
      .then((data) => {
        if (isMounted) {
          setState({ data, isLoading: false, errorMessage: null });
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          const message = error instanceof Error ? error.message : 'Не вдалося завантажити дані.';
          setState({ data: initialData, isLoading: false, errorMessage: message });
        }
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return state;
}
