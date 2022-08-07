import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Notifications from './components/Notifications';

import { initUser } from './reducers/usersReducer';

function App() {
  const dispatch = useDispatch();
  function userSelector(state) {
    return state.user;
  }
  const user = useSelector(userSelector);
  const [notification, setNotification] = useState({
    error: false,
    message: null,
  });

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  function renderBlogs() {
    return <Blogs user={user} setNotification={setNotification} />;
  }

  function renderLoginForm() {
    return <LoginForm setNotification={setNotification} />;
  }

  return (
    <div>
      <Notifications
        error={notification.error}
        message={notification.message}
      />
      <h1>Bloglist App</h1>
      {user ? renderBlogs() : renderLoginForm()}
    </div>
  );
}

export default App;
