import Head from "next/head";
import { useEffect } from "react";

export interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  useEffect(() => {
    document.documentElement.lang = "pt-BR";
  }, []);
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta charSet="utf-8" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </Head>
  );
}
