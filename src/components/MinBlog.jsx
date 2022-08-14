import { useSelector } from 'react-redux';
import propTypes from 'prop-types';

function MinBlog({ id }) {
  function blogSelector(state) {
    return state.blogs.find((b) => b.id === id);
  }

  const blog = useSelector(blogSelector);

  return (
    <div>
      {blog.title} {blog.author}
    </div>
  );
}

MinBlog.propTypes = {
  id: propTypes.string.isRequired,
};

export default MinBlog;
