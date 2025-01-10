import { Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import Auth from "./components/Auth/Auth";
import UserContextProvider from "./context/UserContext";
import GameWrapper from "./components/GameWrapper/GameWrapper";
import GameContextProvider from "./context/GameContext";

const App = () => {

  return (
    <UserContextProvider>
      <div className="App">
        <Routes>
          <Route path={'/'} element={<LandingPage/>}/>
          <Route path={'/home'} element={<HomePage/>}/>
          <Route path={'/auth'} element={<Auth />}/>
        </Routes>
        <GameContextProvider>
          <Routes>
            <Route path={`/games/:gameId`} element={<GameWrapper />}/>
          </Routes>
        </GameContextProvider>
      </div>
    </UserContextProvider>
  )
};

export default App;