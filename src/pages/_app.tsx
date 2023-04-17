import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { hotjar } from 'react-hotjar';

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
import { conf } from '../configs';

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  useEffect(() => {
    // Get Hotjar ID from configuration
    const HOTJAR_ID: string | undefined = conf.HOTJAR_ID;

    // Initialize Hotjar tracking in production environment
    if (process.env.NODE_ENV === 'production' && HOTJAR_ID) {
      const hotjarIdAsNumber = parseInt(HOTJAR_ID, 10);
      hotjar.initialize(hotjarIdAsNumber, 6);
    }

    // Add MavaWebChat script to the document body
    const script = document.createElement('script');
    script.src = 'https://widget.mava.app';
    script.id = 'MavaWebChat';
    script.setAttribute(
      'data-token',
      '4b5905555f806bba755efb553116f0a9b56d0c68c8c0fca78ce171332c61c372'
    );
    document.body.appendChild(script);

    // Remove MavaWebChat script from the document body when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
