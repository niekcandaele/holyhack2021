import { FC, StrictMode, Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { Router } from './router';
import { DEFAULT } from 'styled/theme';
import { GlobalStyle } from 'styled/globalStyle';
import { Loading } from 'components';

export const App: FC = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={DEFAULT}>
        <Suspense fallback={<Loading />}>
          <GlobalStyle />
          <Router />
        </Suspense>
      </ThemeProvider>
    </StrictMode>
  );
};
