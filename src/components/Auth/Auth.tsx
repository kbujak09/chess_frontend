import Logo from '../LandingPage/Logo/Logo';
import Footer from '../LandingPage/Footer/Footer';
import Form from './Form/Form';

const Auth = () => {
  return (
    <div className='homepage'>
      <Logo size={48}/>
      <Form />
      <Footer />
    </div>
  );
};

export default Auth;