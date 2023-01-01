import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <style jsx global>
        {`
          body {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </>
  )
}
