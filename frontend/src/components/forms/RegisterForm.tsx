import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


const RegisterForm: React.FC = () => {

  const { handleCreateUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');


   function handleInputRegister(e: any) {
    e.preventDefault();
    
    handleCreateUser(email, password, name, true, '/register')
  }

  return (
    <form onSubmit={(event) => handleInputRegister(event)}>
      <h1>Create a new account</h1>
      <span>Please register as a new user</span>
      <input required type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input required type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
      <input required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button>Sign Up</button>
    </form>
  )
}



export default RegisterForm