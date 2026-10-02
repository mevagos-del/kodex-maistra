import { useEffect, useState } from 'react';

export type AsyncDataState<T> = {
  data: T;
  isLoading: boolean;
  errorMessage: string | null;
};

type AsyncDataOptions = { blocking?: boolean };

export function useAsyncData<T>(loader: () => Promise<T>, initialData: T, dependencies: unknown[] = [], options: AsyncDataOptions = {}) {
  const blocking = options.blocking ?? true;
  const [state, setState] = useState<AsyncDataState<T>>({
    data: initialData,
    isLoading: blocking,
    errorMessage: null,
  });

  useEffect(() => {
    let isMounted = true;

    setState({ data: initialData, isLoading: blocking, errorMessage: null });

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
