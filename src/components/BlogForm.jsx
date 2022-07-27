import { useState } from 'react';

import blogsService from '../services/blogs';

function BlogForm({ blogs, setBlogs, setNotification, blogFormRef }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  async function saveBlogHandler(event) {
    event.preventDefault();

    try {
      const savedBlog = await blogsService.create({
        title,
        author,
        url,
      });
      setNotification({
        error: false,
        message: `Blog '${savedBlog.title}' added`,
      });
      setTimeout(() => {
        setNotification({
          error: false,
          message: null,
        });
      }, 5000);
      setBlogs(blogs.concat(savedBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
      blogFormRef.current.toggleVisibility();
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

export default BlogForm;
