import React from 'react';
// import UserName from './UserName/UserName';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersList = async () => {
      await fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => setUsers(json));
    };
    fetchUsersList();
  }, []);

  return (
    <Table hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UsersList;
