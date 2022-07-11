import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import UsersTable from '../../components/tables/UsersTable';
import api from '../../services/api';


interface UsersData {
  id: number;
  name: string;
  email: string;
}

const ListUsers: React.FC = () => {
  const [users, setUsers] = useState<UsersData[]>([]);

  useEffect(() => {
    async function getUsers() {
      const { data } = await api.get<UsersData[]>('/users');
      setUsers(data);
    }

    getUsers();
  }, [])

  return (
    <div>
      <Navbar navigation={'users'} />
      <div className="flex-row">
        <div className="styled-container" style={{width: '800px'}}>
          <h2 className="title">View all users</h2>
          <UsersTable usersData={users} />
        </div>
      </div>
    </div>
  );
}

export default ListUsers;