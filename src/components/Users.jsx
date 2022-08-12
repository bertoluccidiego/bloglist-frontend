import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import User from './User';

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
            : users.map((user) => <User key={user.id} user={user} />)}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
