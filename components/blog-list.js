import BlogItem from './blog-item';

export default props => {
  const { blogs } = props;

  return (
    <div>
      {blogs.map(blog => {
        return <BlogItem blog={blog} key={blog.id} />;
      })}
    </div>
  );
};
