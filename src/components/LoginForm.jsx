import { useState } from 'react';

import loginService from '../services/login';

function LoginForm({ setUser, setNotification }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const userObj = await loginService.login({ username, password });
      window.localStorage.setItem(
        'bloglistAppLoggedinUser',
        JSON.stringify(userObj)
      );
      setUser(userObj);
      setUsername('');
      setPassword('');
      setNotification({
        error: false,
        message: `${userObj.name} logged-in`,
      });
      setTimeout(() => {
        setNotification({
          error: false,
          message: null,
        });
      }, 5000);
    } catch (error) {
      console.log();
      setNotification({
        error: true,
        message: error.response.data.error,
      });
      setTimeout(() => {
        setNotification({
          error: false,
          message: null,
        });
      }, 5000);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default LoginForm;
