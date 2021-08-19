import anecdotesReducer, {
  messagesReducer,
  filterReducer,
} from "./reducers/anecdoteReducer";
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  messages: messagesReducer,
  filter: filterReducer,
});
const store = createStore(reducer, composeWithDevTools());

export default store;
