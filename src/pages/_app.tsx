import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';

import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    pageLayout?: React.ComponentType | any; // should fix type
  };
};

import { ThemeProvider } from '@mui/material';
import { theme } from '../utils/theme';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from '../utils/privateRoute';

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <>
      <ThemeProvider theme={theme}>
        {Component.pageLayout ? (
          <PrivateRoute>
            <Component.pageLayout>
              <Component {...pageProps} />
            </Component.pageLayout>
          </PrivateRoute>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}
