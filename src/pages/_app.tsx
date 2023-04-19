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
import AmplitudeAnalytics from '../components/global/AmplitudeAnalytics';
import Script from 'next/script';

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  useEffect(() => {
    // Get Hotjar ID from configuration
    const HOTJAR_ID: string | undefined = conf.HOTJAR_ID;

    // Initialize Hotjar tracking in production environment
    if (process.env.NODE_ENV === 'production' && HOTJAR_ID) {
      const hotjarIdAsNumber = parseInt(HOTJAR_ID, 10);
      hotjar.initialize(hotjarIdAsNumber, 6);
    }
  }, []);

  return (
    <>
      <AmplitudeAnalytics />
      <Script id="tawk" strategy="lazyOnload">
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/6439985c4247f20fefebb1d9/1gu0fmap5';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();
        `}
      </Script>
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
