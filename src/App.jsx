import { useState, useEffect } from 'react';

import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Notifications from './components/Notifications';

import blogsService from './services/blogs';

function App() {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    error: false,
    message: null,
  });

  useEffect(() => {
    const loggedinUser = window.localStorage.getItem('bloglistAppLoggedinUser');
    if (loggedinUser) {
      const userObj = JSON.parse(loggedinUser);
      setUser(userObj);
      blogsService.setToken(userObj.token);
    }
  }, []);

  function renderBlogs() {
    return (
      <Blogs user={user} setUser={setUser} setNotification={setNotification} />
    );
  }

  function renderLoginForm() {
    return <LoginForm setUser={setUser} setNotification={setNotification} />;
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
