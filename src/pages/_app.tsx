import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { hotjar } from 'react-hotjar';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    pageLayout?: React.ComponentType | any;
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
import { usePageViewTracking } from '../helpers/amplitudeHelper';
import SafaryClubScript from '../components/global/SafaryClubScript';
import { TokenProvider } from '../context/TokenContext';
import { ChannelProvider } from '../context/ChannelContext';

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  usePageViewTracking();

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
      <SafaryClubScript />
      <Script id="tawk" strategy="lazyOnload">
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/${conf.PROPERTY_ID}/${conf.WEIGHT_ID}';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();
        `}
      </Script>
      <ThemeProvider theme={theme}>
        <TokenProvider>
          <ChannelProvider>
            {Component.pageLayout ? (
              <PrivateRoute>
                <Component.pageLayout>
                  <Component {...pageProps} />
                </Component.pageLayout>
              </PrivateRoute>
            ) : (
              <Component {...pageProps} />
            )}
          </ChannelProvider>
        </TokenProvider>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}
