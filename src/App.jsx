import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Routes, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Notifications from './components/Notifications';
import Users from './components/Users';

import { initUser, logoutUser } from './reducers/usersReducer';

function App() {
  const dispatch = useDispatch();
  function userSelector(state) {
    return state.user;
  }
  const user = useSelector(userSelector);

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

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
              {user.username} logged-in
              <button type="button" onClick={handleLogout}>
                logout
              </button>
            </>
          ) : (
            'Log-in'
          )}
        </Link>
      </nav>
      <Routes>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="/login"
          element={user ? <p>{`${user.name} logged-in`} </p> : <LoginForm />}
        />
      </Routes>
    </div>
  );
}

export default App;
