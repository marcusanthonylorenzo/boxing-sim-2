import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {

  const client = new ApolloClient({
    uri: "",
    cache: new InMemoryCache()
  });

  return (
    <>
      <ApolloProvider client = {client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default MyApp
