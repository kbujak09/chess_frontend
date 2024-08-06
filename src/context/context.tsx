import { createContext, useState } from "react";

type Children = {
  children: JSX.Element
};

type UserType = {
  id: string,
  username: string
}

type UserContextType = {
  user: UserType,
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const initialUser: UserType = {
  id: '',
  username: ''
};

const defaultValue: UserContextType = {
  user: initialUser,
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(defaultValue);

const UserContextProvider = ({children, user, setUser}: Children & UserContextType) => {
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;