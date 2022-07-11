import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


const LoginForm: React.FC = () => {

  const { handleLogin } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleInputLogin(e: any) {
    e.preventDefault();
    handleLogin(email, password)
  }

  return (
    <form onSubmit={(event) => handleInputLogin(event)}>
            <h1>Sign in</h1>
            <span>Welcome to our e-commerce products management</span>
            <input required type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
      <input required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button>Send</button>
    </form>
  )
}

export default LoginForm