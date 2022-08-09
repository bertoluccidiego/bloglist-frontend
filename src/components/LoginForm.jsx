import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { loginUser } from '../reducers/usersReducer';
import { sendNotification } from '../reducers/notificationsReducer';

function LoginForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event) {
    event.preventDefault();

    try {
      dispatch(loginUser(username, password));
      dispatch(sendNotification(false, `${username} logged-in`));
      setUsername('');
      setPassword('');
    } catch (error) {
      dispatch(sendNotification(true, error.response.data.error));
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
