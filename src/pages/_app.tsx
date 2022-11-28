import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    pageLayout?: React.ComponentType | any; // should fix type
  };
};

import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";


export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <>
      <ThemeProvider theme={theme}>
        {Component.pageLayout ? (
          <Component.pageLayout>
            <Component {...pageProps} />
          </Component.pageLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </>
  );
}
