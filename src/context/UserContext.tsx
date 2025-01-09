import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";

type Children = {
  children: JSX.Element
};

type UserType = {
  token: string,
  id: string,
  username: string
}

type UserContextType = {
  user: UserType,
  setUser: Dispatch<SetStateAction<UserType>>;
};

const initialUser: UserType = {
  token: '',
  id: '',
  username: ''
};

const defaultValue: UserContextType = {
  user: initialUser,
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(defaultValue);

const UserContextProvider = ({children}: Children ) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const id = localStorage.getItem('userId');
    return token && username && id ?
      { token: token, username: username, id: id} : { token: '', username: '', id: '' }
  });

  useEffect(() => {
    if (user.token && user.username && user.id) {
      localStorage.setItem('token', user.token);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('username', user.username);
    }
    else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
    }
    }, [user]);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;