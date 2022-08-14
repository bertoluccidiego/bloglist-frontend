import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { initializeBlogs } from '../reducers/blogsReducer';

import IndividualBlog from './IndividualBlog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

function Blogs() {
  const dispatch = useDispatch();
  function blogsSelector(state) {
    return state.blogs;
  }
  const blogs = useSelector(blogsSelector);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const sortedBlogs = blogs
    ? blogs.slice().sort((a, b) => b.likes - a.likes)
    : null;

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <ul>
        {!sortedBlogs
          ? null
          : sortedBlogs.map((blog) => (
              <IndividualBlog key={blog.id} id={blog.id} />
            ))}
      </ul>
    </div>
  );
}

export default Blogs;
