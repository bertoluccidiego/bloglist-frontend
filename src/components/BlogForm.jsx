import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { createBlog } from '../reducers/blogsReducer';

function BlogForm({ setNotification, blogFormRef }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  async function saveBlogHandler(event) {
    event.preventDefault();

    try {
      const newBlogObj = {
        title,
        author,
        url,
      };
      dispatch(createBlog(newBlogObj));
      setNotification({
        error: false,
        message: `Blog '${newBlogObj.title}' added`,
      });
      setTimeout(() => {
        setNotification({
          error: false,
          message: null,
        });
      }, 5000);
      setTitle('');
      setAuthor('');
      setUrl('');
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.log(error);
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
    <form onSubmit={saveBlogHandler}>
      <div>
        title{' '}
        <input
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        <button type="submit">save</button>
      </div>
    </form>
  );
}

BlogForm.propTypes = {
  setNotification: PropTypes.func.isRequired,
  // blogFormRef: PropTypes.func.isRequired,
  blogFormRef: PropTypes.shape({
    current: PropTypes.shape({ toggleVisibility: PropTypes.func }),
  }).isRequired,
};

export default BlogForm;
