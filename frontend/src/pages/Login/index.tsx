import React, { useState } from 'react';
import Login from '../../components/forms/LoginForm';
import RegisterForm from '../../components/forms/RegisterForm';

const LoginApp: React.FC = () => {

  const [signUp, setSignUp] = useState(false);
  //eslint-disable-next-line
  const [login, setLogin] = useState(false);

  function handleSignClick(){
      setSignUp(true);
      setLogin(false);
  }

  function handleLoginClick(){
    
      setSignUp(false);
      setLogin(true);
   
  }

  return (
        <div className={signUp? 'right-item-active container container-fluid' : 'container container-fluid'}>
        <div className="form-container sign-up-container">
          <RegisterForm />
        </div>
        <div className="form-container sign-in-container">
          <Login />
        </div>
        <div className="panel-container">
          <div className="panel">
            <div className="panel-item panel-left">
              <h1>Let's get started!</h1>
              <p>Please sign in our application</p>
              <button className="ghost" id="signIn" onClick={() => handleLoginClick()}>Sign In</button>
            </div>
            <div className="panel-item panel-right">
              <h1>Welcome!</h1>
              <p>Create your account and start to manage your products</p>
              <button className="ghost" id="signUp" onClick={() => handleSignClick()}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default LoginApp;