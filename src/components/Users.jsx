import { useEffect, useState } from 'react';

import User from './User';

import usersService from '../services/users';

function Users() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    usersService.getAll().then((result) => setUsers(result));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td />
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {!users
            ? null
            : users.map((user) => <User key={user.id} user={user} />)}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
