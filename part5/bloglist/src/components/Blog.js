import React, { useState } from "react";
const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [allInfoVisible, setAllInfoVisible] = useState(false);
  const toggleVisible = () => setAllInfoVisible(!allInfoVisible);
  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <button onClick={toggleVisible}>
        {allInfoVisible ? "Hide" : "View"}
      </button>
      {allInfoVisible && (
        <div>
          <p>{blog.url} </p>
          <p>
            Likes:
            {blog.likes}
            <button onClick={() => handleLike(blog.likes + 1, blog.id)}>
              like
            </button>{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default Blog;
