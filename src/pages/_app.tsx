import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    pageLayout?: React.ComponentType | any; // should fix type
  };
};

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <>
      {Component.pageLayout ? (
        <Component.pageLayout>
          <Component {...pageProps} />
        </Component.pageLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
