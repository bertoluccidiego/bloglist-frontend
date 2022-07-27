import { useState } from 'react';
import PropTypes from 'prop-types';

import blogsService from '../services/blogs';

function IndividualBlog({ blog, blogs, setBlogs, setNotification }) {
  const [showFull, setShowFull] = useState(false);

  function toggleShow() {
    setShowFull(!showFull);
  }

  async function likeHandler() {
    const likedBlogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    try {
      const updatedBlog = await blogsService.update(likedBlogObj, blog.id);
      const updatedBlogs = blogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b
      );
      setBlogs(updatedBlogs);
      setNotification({
        error: false,
        message: `'${updatedBlog.title}' liked`,
      });
      setTimeout(() => {
        setNotification({
          error: false,
          message: null,
        });
      }, 5000);
    } catch (error) {
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

  async function deleteHandler() {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      try {
        await blogsService.remove(blog.id);
        setNotification({
          error: false,
          message: `'${blog.title}' removed`,
        });
        setTimeout(() => {
          setNotification({
            error: false,
            message: null,
          });
        }, 5000);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (error) {
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
  }

  function renderFull() {
    return (
      <ul>
        <li>
          {blog.title} {blog.author}
          <button type="button" onClick={toggleShow}>
            view
          </button>
        </li>
        <li>{blog.url}</li>
        <li>
          {blog.likes}
          <button type="button" onClick={likeHandler}>
            like
          </button>
        </li>
        <li>{blog.user.name}</li>
        <button type="button" onClick={deleteHandler}>
          remove
        </button>
      </ul>
    );
  }

  function renderMin() {
    return (
      <li>
        {blog.title} {blog.author}
        <button type="button" onClick={toggleShow}>
          view
        </button>
      </li>
    );
  }

  if (showFull) {
    return renderFull();
  }

  return renderMin();
}

IndividualBlog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }),
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      url: PropTypes.string,
      likes: PropTypes.number.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default IndividualBlog;
