import { useState, useEffect } from 'react';

import IndividualBlog from './IndividualBlog';
import BlogForm from './BlogForm';

import blogsService from '../services/blogs';

function Blogs({ user, setUser, setNotification }) {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    blogsService.getAll().then((result) => setBlogs(result));
  }, []);

  function handleLogout() {
    window.localStorage.removeItem('bloglistAppLoggedinUser');
    setUser(null);
  }

  return (
    <div>
      <h2>Blogs</h2>
      {user.name} is logged-in
      <div>
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </div>
      <BlogForm
        blogs={blogs}
        setBlogs={setBlogs}
        setNotification={setNotification}
      />
      <ul>
        {!blogs
          ? null
          : blogs.map((blog) => <IndividualBlog key={blog.id} blog={blog} />)}
      </ul>
    </div>
  );
}

export default Blogs;
