import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import LandingPage from "./components/LandingPage/LandingPage";
import Auth from "./components/Auth/Auth";
import UserContextProvider from "./context/context";
import HomePage from "./components/HomePage/HomePage";

const App = () => {

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
    <UserContextProvider user={user} setUser={setUser}>
      <div className="App">
        <Routes>
          <Route path={'/'} element={user.id && user.username && user.token ? <HomePage/> : <LandingPage/>}/>
          <Route path={'/auth'} element={<Auth />}/>
        </Routes>
      </div>
    </UserContextProvider>
  )
};

export default App;