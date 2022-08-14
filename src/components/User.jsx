import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function User() {
  const { userId } = useParams();
  function userSelector(state) {
    return state.usersInfo.find((u) => u.id === userId);
  }
  const user = useSelector(userSelector);

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default User;
