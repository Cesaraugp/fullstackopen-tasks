import loginService from "../services/login";

export const logIn = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    });
    console.log(user);
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    dispatch({
      type: "LOG_IN",
      data: user,
    });
  };
};

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_USER",
      data: user,
    });
  };
};

export const logOut = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.href = `${window.location.href}`; //No-self assigned vars
    dispatch({
      type: "LOG_OUT",
    });
  };
};
const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOG_IN":
      return { user: action.data };
    case "SET_USER":
      return { user: action.data };

    case "LOG_OUT":
      return { user: {} };
    default:
      return state;
  }
};

export default authReducer;
