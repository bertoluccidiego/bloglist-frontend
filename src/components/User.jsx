import propTypes from 'prop-types';

function User({ user }) {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.blogs.length}</td>
    </tr>
  );
}

User.propTypes = {
  user: propTypes.shape({
    username: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
    blogs: propTypes.arrayOf(
      propTypes.shape({
        title: propTypes.string.isRequired,
        author: propTypes.string.isRequired,
        url: propTypes.string.isRequired,
        id: propTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default User;
