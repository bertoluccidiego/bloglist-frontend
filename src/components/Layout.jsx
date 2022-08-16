import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { logoutUser } from '../reducers/usersReducer';

import Notifications from './Notifications';

import StyledLink from '../styles/StyledLink';

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
        <StyledLink to="/blogs">Blogs</StyledLink>
        <StyledLink to="/users">Users</StyledLink>
        <StyledLink to="/login">
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
        </StyledLink>
      </nav>
      <Outlet />
    </div>
  );
}
