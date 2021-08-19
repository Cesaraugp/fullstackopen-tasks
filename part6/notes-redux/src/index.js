import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import noteReducer, { filterReducer } from "./reducers/NoteReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({ notes: noteReducer, filter: filterReducer });

const store = createStore(reducer, composeWithDevTools());

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};
renderApp();
store.subscribe(renderApp);
