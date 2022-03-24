import React from 'react';
import UserHoverComponent from './userHoverComponent';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function UsersList() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchUsersList = async () => {
      await fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => setUsersList(json));
    };
    fetchUsersList();
  }, []);

  return (
    <div>
      <h3>User's List</h3>
      <hr />
      <Table hover size="sm">
        <thead>
          <tr>
            <th>User Id</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <UserHoverComponent user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UsersList;
