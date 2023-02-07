import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/Layout";
import { Provider } from "react-redux";
import store from "../store/store";
import { persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import "../../globals.css";
import "../../public/style.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SessionProvider session={pageProps.session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </PersistGate>
      </Provider>
      <style jsx global>
        {``}
      </style>
    </>
  );
}
