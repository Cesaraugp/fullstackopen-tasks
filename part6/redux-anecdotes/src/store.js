import anecdotesReducer, { messagesReducer } from "./reducers/anecdoteReducer";
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  messages: messagesReducer,
});
const store = createStore(reducer, composeWithDevTools());

export default store;
