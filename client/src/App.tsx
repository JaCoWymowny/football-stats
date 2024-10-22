import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Global } from '@emotion/react';
import { globalCss } from './theme/theme';

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <>
          <Global styles={globalCss} />
          <div>
            <header>
              <p>hey</p>
            </header>
          </div>
        </>
      </QueryClientProvider>
  );
}

export default App;