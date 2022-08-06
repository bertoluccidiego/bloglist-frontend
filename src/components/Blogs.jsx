import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { setBlogs } from '../reducers/blogsReducer';

import IndividualBlog from './IndividualBlog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

import blogsService from '../services/blogs';

function Blogs({ user, setUser, setNotification }) {
  const dispatch = useDispatch();
  function blogsSelector(state) {
    return state.blogs;
  }
  const blogs = useSelector(blogsSelector);

  const blogFormRef = useRef();

  useEffect(() => {
    blogsService.getAll().then((result) => dispatch(setBlogs(result)));
  }, [dispatch]);

  function handleLogout() {
    window.localStorage.removeItem('bloglistAppLoggedinUser');
    setUser(null);
  }

  const sortedBlogs = blogs ? blogs.sort((a, b) => b.likes - a.likes) : null;

  return (
    <div>
      <h2>Blogs</h2>
      {user.name} is logged-in
      <div>
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm setNotification={setNotification} blogFormRef={blogFormRef} />
      </Togglable>
      <ul>
        {!sortedBlogs
          ? null
          : sortedBlogs.map((blog) => (
              <IndividualBlog
                key={blog.id}
                blog={blog}
                blogs={blogs}
                setNotification={setNotification}
              />
            ))}
      </ul>
    </div>
  );
}

Blogs.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default Blogs;
