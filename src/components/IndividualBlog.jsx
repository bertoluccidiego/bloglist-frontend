import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteBlog, updateBlog } from '../reducers/blogsReducer';

function IndividualBlog({ id, setNotification }) {
  const dispatch = useDispatch();

  const [showFull, setShowFull] = useState(false);
  function blogSelector(state) {
    return state.blogs.find((b) => b.id === id);
  }
  const blog = useSelector(blogSelector);

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
      dispatch(updateBlog(likedBlogObj, blog.id));
      setNotification({
        error: false,
        message: `'${likedBlogObj.title}' liked`,
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
        dispatch(deleteBlog(blog.id));
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
  id: PropTypes.string.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default IndividualBlog;
