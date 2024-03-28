import '@styles/globals.css';

import { useMemo, FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RouterProvider } from 'react-router-dom';
import AppProvider from '@components/AppProvider';
import { INITIAL_QUERY_OPTIONS } from '@constants/query';

import routes from './routes';

export const App: FunctionComponent = () => {
  const queryClient = useMemo(() => new QueryClient(INITIAL_QUERY_OPTIONS), []);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <AppProvider />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
