import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const httpLink = createHttpLink({
  uri: "http://localhost:3333/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  console.log(session);
  if (session?.user.accessToken) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${session?.user.accessToken}`,
      },
    };
  }
  return {
    headers: {
      ...headers,
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;