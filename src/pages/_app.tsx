import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
      <style jsx global>
        {`
          body {
            // height: 100vh;
            display: flex;
            justify-content: center;
            // align-items: center;
          }
        `}
      </style>
    </>
  );
}
