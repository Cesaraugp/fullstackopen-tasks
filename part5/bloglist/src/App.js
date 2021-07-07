import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log(user);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      console.log(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("error: Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const logOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.href = window.location.href;
  };
  const newBlogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={(e) => newBlog(e, title, author, url)}>
          <div>
            title:{" "}
            <input
              id="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:{" "}
            <input
              id="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:{" "}
            <input
              id="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit" id="create">
            create
          </button>
        </form>
      </div>
    );
  };
  const newBlog = async (e, title, author, url) => {
    e.preventDefault();

    const blog = {
      title: title,
      author: author,
      url: url,
    };

    const result = await blogService.create(blog);
    setBlogs(blogs.concat(result));
    setErrorMessage(`a new Blog ${title} by ${author}`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };
  return (
    <div>
      <Notification message={errorMessage} />
      {user == null ? (
        loginForm()
      ) : (
        <div>
          Welcome! {user.name}, you are logged in{" "}
          <button onClick={logOut}>Log Out</button>
          {newBlogForm()}
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
