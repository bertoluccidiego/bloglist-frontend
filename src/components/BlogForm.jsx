import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { createBlog } from '../reducers/blogsReducer';
import { sendNotification } from '../reducers/notificationsReducer';

function BlogForm({ blogFormRef }) {
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
      dispatch(sendNotification(false, `Blog '${newBlogObj.title}' added`));
      setTitle('');
      setAuthor('');
      setUrl('');
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(sendNotification(true, error.response.data.error));
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
  blogFormRef: PropTypes.shape({
    current: PropTypes.shape({ toggleVisibility: PropTypes.func }),
  }).isRequired,
};

export default BlogForm;
