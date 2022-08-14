import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUsersInfo } from '../reducers/usersInfoReducer';

function Users() {
  function usersInfoSelector(state) {
    return state.usersInfo;
  }

  function blogsSelector(state) {
    return state.blogs;
  }

  const dispatch = useDispatch();
  const users = useSelector(usersInfoSelector);
  const blogs = useSelector(blogsSelector);

  useEffect(() => {
    dispatch(getUsersInfo());
  }, [dispatch, blogs]);

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
            : users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
