import { Routes, Route } from "react-router-dom";

import GameContextProvider from "./context/GameContext";
import UserContextProvider from "./context/UserContext";

import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import Auth from "./components/Auth/Auth";
import GameWrapper from "./components/GameWrapper/GameWrapper";

const App = () => {

  return (
    <UserContextProvider>
      <GameContextProvider>
        <div className="App">
          <Routes>
            <Route path={'/'} element={<LandingPage/>}/>
            <Route path={'/home'} element={<HomePage/>}/>
            <Route path={'/auth'} element={<Auth />}/>
            <Route path={`/games/:gameId`} element={<GameWrapper />}/>
          </Routes>
        </div>
      </GameContextProvider>
    </UserContextProvider>
  )
};

export default App;