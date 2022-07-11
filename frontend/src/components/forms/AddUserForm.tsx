import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';

const AddUserForm: React.FC = () => {

  const initialFormState = { id: null, name: '', email: '', password: '', is_admin: false };
  const [user, setUser] = useState(initialFormState);
  const { createToasty } = useContext(AuthContext)

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }


  async function handleCreateProduct(event: any) {
    event.preventDefault();

    const { name, email, password, is_admin } = user;

    await api.post("/users", {
      name,
      email,
      password,
      is_admin
    }).then(() => createToasty(`User ${name} successfully created.`))

    setUser(initialFormState);
  }

  return (
    <form
      onSubmit={(event) => handleCreateProduct(event)}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        required
        value={user.name}
        onChange={handleInputChange}
      />
      <label>E-Mail</label>
      <input
        type="email"
        name="email"
        required
        value={user.email}
        onChange={handleInputChange}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        required
        value={user.password}
        onChange={handleInputChange}
      />
      <label> Is this user an Admin?
      <input
          type="checkbox"
          name="is_admin"
          checked
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button>Add new user</button>
    </form>
  )
}

export default AddUserForm