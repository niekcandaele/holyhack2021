import { FC, StrictMode, Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { Router } from './router';
import { DEFAULT } from 'styled/theme';
import { GlobalStyle } from 'styled/globalStyle';
import { Loading } from 'components';
import { Provider } from 'use-http';

export const App: FC = () => {
  const options = {
    headers: {
      Accept: 'application/json'
    }
  };
  console.log(process.env.REACT_APP_API);

  return (
    <StrictMode>
      <ThemeProvider theme={DEFAULT}>
        <Suspense fallback={<Loading />}>
          <Provider options={options} url={process.env.REACT_APP_API}>
            <GlobalStyle />
          </Provider>
          <Router />
        </Suspense>
      </ThemeProvider>
    </StrictMode>
  );
};
