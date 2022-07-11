import React from 'react';

interface PropsUsers {
  usersData: {
    id: number;
    name: string;
    email: string
  }[]
}

const UsersTable: React.FC<PropsUsers> = ({ usersData }) => {

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>E-mail</th>
        </tr>
      </thead>
      <tbody>
        {usersData.length > 0 ? (
          usersData.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No users</td>
          </tr>
        )}

      </tbody>
    </table>
  )
}

export default UsersTable;