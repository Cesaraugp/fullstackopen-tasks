import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import { useDispatch, useSelector } from "react-redux";
import {
  initializeBlogs,
  newBlog,
  removeBlog,
  likeBlog,
  setToken,
} from "./reducers/blogsReducer";
import { logIn, logOut, setUser } from "./reducers/authReducer";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const userState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Iniciar sesion
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      if (!userState.user) {
        dispatch(setUser(user));
      }
    }
  }, [dispatch, userState.user]);
  // Inicializar blogs
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setToken(user));
      dispatch(initializeBlogs());
    }
  }, [userState, dispatch]);

  const loginForm = () => (
    <form onSubmit={handleLogin} id="login-form">
      <div>
        username
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
  const blogForm = () => (
    <Togglable buttonLabel="create new Blog" buttonId="new-blog-btn">
      <BlogForm handleSubmit={handleNewBlog} />
    </Togglable>
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(logIn(username, password));
      dispatch(setToken(userState));
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("error: Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
  };
  const handleLike = (likes, id) => {
    try {
      dispatch(likeBlog(likes, id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveBlog = async (id) => {
    try {
      console.log(id);
      dispatch(removeBlog(id));
      setErrorMessage("A blog Has been DELETED");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewBlog = async (e, title, author, url) => {
    e.preventDefault();

    const blog = {
      title: title,
      author: author,
      url: url,
    };
    dispatch(newBlog(blog));

    setErrorMessage(`a new Blog ${title} by ${author}`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };
  return (
    <div>
      <Notification message={errorMessage} />
      {!userState.user ? (
        loginForm()
      ) : (
        <div>
          Welcome! {userState.user.username}, you are logged in{" "}
          <button onClick={handleLogout}>Log Out</button>
          {blogForm()}
          <h2>blogs</h2>
          {blogs.blogs &&
            blogs.blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleRemove={handleRemoveBlog}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
