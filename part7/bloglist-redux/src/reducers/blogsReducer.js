import blogService from "../services/blogs";

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    dispatch({
      type: "INIT_BLOGS",
      data: { blogs, token: "" },
    });
  };
};

export const setToken = ({ token }) => {
  return async (dispatch) => {
    await blogService.setToken(token);
    dispatch({
      type: "SET_TOKEN",
      data: { token },
    });
  };
};

export const likeBlog = (likes, id) => {
  return async (dispatch) => {
    const likedBlog = await blogService.like({ likes }, id);
    dispatch({
      type: "LIKE_BLOG",
      data: { likedBlog },
    });
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({
      type: "DELETE_BLOG",
      data: { id },
    });
  };
};

export const newBlog = (blog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(blog);
    dispatch({
      type: "NEW_BLOG",
      data: { createdBlog },
    });
  };
};

const blogsReducer = (state = {}, action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "NEW_BLOG":
      const { createdBlog } = action.data;
      return { ...state, blogs: state.blogs.concat(createdBlog) };

    case "LIKE_BLOG":
      const { likedBlog } = action.data;
      const id = likedBlog.id;
      return {
        ...state,
        blogs: state.blogs
          .map((blog) => (blog.id !== id ? blog : likedBlog))
          .sort((a, b) => b.likes - a.likes),
      };
    case "SET_TOKEN":
      console.log(action.data);
      return { ...state, token: action.data.token };
    case "DELETE_BLOG":
      const blogId = action.data.id;
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== blogId),
      };
    default:
      return state;
  }
};

export default blogsReducer;
