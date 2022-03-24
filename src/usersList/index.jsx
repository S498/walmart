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
    <Table hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>User Name</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>
              <UserHoverComponent
                user={user}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    // <Table striped bordered hover size="sm">
    //   <thead>
    //     <tr>
    //       <th>#</th>
    //       <th>Name</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {usersList.map((user) => (
    //       <tr key={user.id}>
    //         <td>{user.id}</td>
    //         <td><UserHoverComponent
    //             name={user.name}
    //             username={user.username}
    //             email={user.email}
    //           /></td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </Table>
  );
}

export default UsersList;
