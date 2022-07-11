import React from 'react';
import AddUserForm from '../../components/forms/AddUserForm';
import Navbar from '../../components/navbar';

const CreateUser: React.FC = () => {
  return (
    <div className="flex-large">
      <Navbar navigation={'userAdd'} />
      <div className="styled-container small-container">
      <h2 className="title">Register as a new user</h2>
      <AddUserForm />
      </div>
    </div>
  );
}

export default CreateUser;