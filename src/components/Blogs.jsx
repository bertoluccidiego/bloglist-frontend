import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import BlogForm from './BlogForm';
import Togglable from './Togglable';
import MinBlog from './MinBlog';

function Blogs() {
  function blogsSelector(state) {
    return state.blogs;
  }
  const blogs = useSelector(blogsSelector);

  const blogFormRef = useRef();

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
              <Link to={`/blogs/${blog.id}`} key={blog.id}>
                <MinBlog id={blog.id} />
              </Link>
            ))}
      </ul>
    </div>
  );
}

export default Blogs;
