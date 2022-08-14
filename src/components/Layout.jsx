import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

import { logoutUser } from '../reducers/usersReducer';

import Notifications from './Notifications';

export default function Layout() {
  function userSelector(state) {
    return state.user;
  }
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <div>
      <Notifications />
      <h1>Bloglist App</h1>
      <nav>
        <Link style={{ padding: '1rem' }} to="/blogs">
          Blogs
        </Link>
        <Link style={{ padding: '1rem' }} to="/users">
          Users
        </Link>
        <Link style={{ padding: '1rem' }} to="/login">
          {user ? (
            <>
              {user.username} logged-in{' '}
              <button type="button" onClick={handleLogout}>
                logout
              </button>
            </>
          ) : (
            'Log-in'
          )}
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
