import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";

import App from "../App";

const link = new HttpLink({
  uri: "http://localhost:5000/",
});

const client = new ApolloClient({
  uri: link,
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
