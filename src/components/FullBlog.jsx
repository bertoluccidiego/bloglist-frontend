import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { updateBlog } from '../reducers/blogsReducer';
import { sendNotification } from '../reducers/notificationsReducer';

export default function FullBlog() {
  const dispatch = useDispatch();
  const { blogId } = useParams();

  function blogSelector(state) {
    if (!state.blogs) {
      return null;
    }
    return state.blogs.find((b) => b.id === blogId);
  }

  const blog = useSelector(blogSelector);

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
      dispatch(sendNotification(false, `'${likedBlogObj.title}' liked`));
    } catch (error) {
      dispatch(sendNotification(true, error.response.data.error));
    }
  }

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button type="button" onClick={likeHandler}>
          like
        </button>
      </div>
      <div>Added by {blog.user.name}</div>
    </div>
  );
}
