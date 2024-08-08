import { useContext } from "react";
import { UserContext } from "../../../context/context";

import icon from '../../../assets/logout.svg';

const LogOut = () => {
  const { setUser } = useContext(UserContext)

  const logOut = () => {
    localStorage.clear();
    setUser({
      id: '',
      username: ''
    });
  }
  
  return <div onClick={logOut}>
    <img src={icon} alt="logout" style={{'opacity': '0.7'}}/>
  </div>
};

export default LogOut;