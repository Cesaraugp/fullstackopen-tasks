import { createStore, combineReducers, applyMiddleware } from "redux";
import blogsReducer from "./reducers/blogsReducer";
import authReducer from "./reducers/authReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
  blogs: blogsReducer,
  auth: authReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
