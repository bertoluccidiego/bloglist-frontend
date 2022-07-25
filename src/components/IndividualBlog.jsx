function IndividualBlog({ blog }) {
  return (
    <li>
      {blog.title} {blog.author}
    </li>
  );
}

export default IndividualBlog;
