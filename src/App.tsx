import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import LandingPage from "./components/LandingPage/LandingPage";
import Auth from "./components/Auth/Auth";
import UserContextProvider from "./context/context";
import HomePage from "./components/HomePage/HomePage";

const App = () => {

  const [user, setUser] = useState({
    id: '',
    username: ''
  });

  return (
    <UserContextProvider user={user} setUser={setUser}>
      <div className="App">
        <Routes>
          <Route path={'/'} element={user.id && user.username ? <HomePage/> : <LandingPage/>}/>
          <Route path={'/auth'} element={<Auth />}/>
        </Routes>
      </div>
    </UserContextProvider>
  )
};

export default App;