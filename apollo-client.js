import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/link-context";

const httpLink = createHttpLink({
  uri: "http://localhost:3333/graphql",
});

const authLink = setContext((_, { headers }) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const accessToken = localStorage.getItem("accessToken");
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  }
  return
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
