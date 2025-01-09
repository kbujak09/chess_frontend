import { Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import Logo from './Logo/Logo';
import Welcome from './Welcome/Welcome';
import Footer from './Footer/Footer';
import { UserContext } from '../../context/UserContext';

const LandingPage = () => {
  const { user } = useContext(UserContext);

  const welcomeText = 'Play chess anytime, anywhere';
  const welcomeLink = 'Play Now';

  if (user.token) {
    return <Navigate to='/home'/>
  }

  return (
    <div className='homepage'>
      <Logo size={48}/>
      <Welcome text={welcomeText} linkText={welcomeLink}/>
      <Footer/>
    </div>
  )
};

export default LandingPage;