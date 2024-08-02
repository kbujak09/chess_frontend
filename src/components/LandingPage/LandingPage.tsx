import Logo from './Logo/Logo';
import Welcome from './Welcome/Welcome';
import Footer from './Footer/Footer';

const LandingPage = () => {

  const welcomeText = 'Play chess anytime, anywhere';
  const welcomeLink = 'Play Now';

  return (
    <div className='homepage'>
      <Logo size={48}/>
      <Welcome text={welcomeText} linkText={welcomeLink}/>
      <Footer/>
    </div>
  )
};

export default LandingPage;