import { createContext, useMemo, useState } from "react";

type User = {
  id: string,
  username: string
}

type UserContextType = {
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({children}: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(() => ({user, setUser}), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};