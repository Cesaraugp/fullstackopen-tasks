import React, { useEffect } from "react";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import { VisibilityFilter } from "./components/VisibilityFilter";
import { initializeNotes } from "./reducers/NoteReducer";
import { useDispatch } from "react-redux";
import Home from "./components/Home";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  const padding = {
    padding: 5,
  };
  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>

      <Switch>
        <Route path="/notes">
          <VisibilityFilter />
          <Notes />
          <NewNote />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/users">
          <Notes />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
