import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './form.module.scss';
import { UserContext } from '../../../context/context';

const Form = () => {

  const navigate = useNavigate();

  const [formType, setFormType] = useState<string>('login');

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const userContext = useContext(UserContext);

  if (!userContext) {
    return null;
  }

  const { user, setUser } = userContext;

  const handleRegister = async () => {
    const req = await fetch('http://127.0.0.1:5000/api/register', {
      method: 'POST',
      body: JSON.stringify({
        'username': username,
        'password': password,
        'confirm_password': confirmPassword,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const data = await req.json();
    console.log(data.message);
  };

  const handleLogin = async () => {
    const req = await fetch('http://127.0.0.1:5000/api/login', {
      method: 'POST',
      body: JSON.stringify({
        'username': username,
        'password': password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    if (req.status !== 201) {
      return;
    }
    const data = await req.json();
    setUser(data.user);
    console.log(data.user)
    localStorage.setItem('token', data.token);
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formType === 'login' ?
      handleLogin()
      :
      handleRegister()
  };

  const resetState = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleTypeSwitch = () => {
    formType === 'login' ?
      setFormType('register') 
    :
      setFormType('login')
    resetState();
  };

  // useEffect(() => {
  //   navigate('/');
  // }, [localStorage.token])

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        { formType === 'login' && (
          <>
            <h2 className={styles.title}>Login</h2>
            <div className={styles.field}>
              <label htmlFor="username" className={styles.label}>Username</label>
              <input 
                type="text" 
                id='username' 
                className={styles.input} 
                onChange={(e) => setUsername(e.target.value)}
                required/>
            </div>
            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input 
                type="password" 
                id='password' 
                className={styles.input} 
                onChange={(e) => setPassword(e.target.value)}
                required/>
            </div>
            <button className={styles.submit}>
              Log in
            </button>
            <div className={styles.question}>
              Don't have an account?
              <div className={styles.button} onClick={handleTypeSwitch}>
                Click here!
              </div>
            </div>
          </>
          )
        }
        {
          formType === 'register' && (
            <>
              <h2 className={styles.title}>Register</h2>
              <div className={styles.field}>
                <label htmlFor="username" className={styles.label}>Username</label>
                <input 
                  type="text" 
                  id='username' 
                  className={styles.input} 
                  onChange={(e) => setUsername(e.target.value)}
                  required/>
              </div>
              <div className={styles.field}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <input 
                  type="password" 
                  id='password' 
                  className={styles.input} 
                  onChange={(e) => setPassword(e.target.value)}
                  required/>
              </div>
              <div className={styles.field}>
                <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                <input 
                  type="password" 
                  id='confirmPassword' 
                  className={styles.input} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required/>
              </div>
              <button className={styles.submit}>
                Create Account
              </button>
              <div className={styles.question}>
                Already have an account?
              <div className={styles.button} onClick={handleTypeSwitch}>
                Click here!
              </div>
            </div>
            </>
          )
        }
      </form>
    </div>
  )
};

export default Form;