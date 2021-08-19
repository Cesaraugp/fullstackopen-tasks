import anecdotesReducer from "./reducers/anecdoteReducer";
import messagesReducer from "./reducers/notificationsReducer";
import filterReducer from "./reducers/filterReducer";
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  messages: messagesReducer,
  filter: filterReducer,
});
const store = createStore(reducer, composeWithDevTools());

export default store;
