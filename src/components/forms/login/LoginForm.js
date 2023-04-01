import { useState } from 'react';
import './LoginForm.scss';

import * as auth from '../../../auth/index';
import { useDispatch, useSelector} from 'react-redux';
import { login, logout } from '../../../redux/slices/usersSlice';


const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const userInfo = useSelector((state)=> state.user)

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = async(event) => {
      event.preventDefault();
      // Handle login logic here

      try{
          const userAuth = await auth.login(email, password) 
          if(userAuth){
            dispatch(
              login({
                email: userAuth.email,
                uid: userAuth.uid,
                displayName: userAuth.displayName,
                photoUrl: userAuth.photoURL,
              })
            );
            setIsLoggedIn(true);
          }
       
      }
      catch(e){
         console.log(e);
      }
    };
  
    return (
      <>
      {isLoggedIn &&
        <div>Logged in</div>
      
      } 
      {
      !isLoggedIn &&
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-form__label">Email:</label>
        <input
          className="login-form__input"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label className="login-form__label">Password:</label>
        <input
          className="login-form__input"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="login-form__button" type="submit">
          Login
        </button>
      </form>
      }
      </>
    );
  };

  export default LoginForm;