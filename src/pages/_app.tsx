import type { AppProps } from "next/app";
import Head from "next/head";
import "/src/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
