import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Game from './components/Game/Game';
import LandingPage from "./components/LandingPage/LandingPage";
import Auth from "./components/Auth/Auth";

const App = () => {

  const [user, setUser] = useState<string>('');

  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={user ? null : <LandingPage/>}/>
        <Route path={'/auth'} element={<Auth/>}/>
      </Routes>
    </div>
  )
};

export default App;