import { createContext, useContext, useState, useEffect } from "react";
import { User } from "../../types";
import { useCookies } from "react-cookie";
import client from "../../apollo-client";
import { gql } from "@apollo/client";
import { setContext } from "@apollo/link-context";

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};
type UserContextProviderProps = {
  children: React.ReactNode;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

const fetchUser = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        me {
          id
          lastname
          firstname
          email
          accessToken
          refreshToken
        }
      }
    `,
  });
  return data.me;
};

const refreshUserToken = async () => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation refreshToken($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
          id
          lastname
          firstname
          email
          accessToken
          refreshToken
        }
      }
    `,
    variables: {
      refreshToken: localStorage.getItem("refreshToken"),
    },
  });
  return data.refreshToken;
};
export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken) {
      fetchUser()
        .then((me) => setUser(me))
        .catch(() => {
          localStorage.removeItem("accessToken");
          setUser(null);
          refreshUserToken()
            .then((me) => setUser(me))
            .catch(() => {
              localStorage.removeItem("refreshToken");
              setUser(null);
            });
        });
      return;
    }
  }, []);

  useEffect(() => {
    if (user?.accessToken) {
      localStorage.setItem("accessToken", user?.accessToken);
      localStorage.setItem("refreshToken", user?.refreshToken);
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
