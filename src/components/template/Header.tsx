<<<<<<< HEAD
/* eslint-disable @next/next/no-sync-scripts */
=======
>>>>>>> da4f1068b3dfbb833818bbf8a5266cb04728dd7b
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
<<<<<<< HEAD
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.datatables.net/v/dt/dt-1.12.1/datatables.min.css"
      />

      <script
        type="text/javascript"
        src="https://cdn.datatables.net/v/dt/dt-1.12.1/datatables.min.js"
      ></script>
=======
>>>>>>> da4f1068b3dfbb833818bbf8a5266cb04728dd7b
    </Head>
  );
}
