import { createContext, useContext, useState } from "react";
import { User } from "../../types";

type UserContextType = {
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

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
