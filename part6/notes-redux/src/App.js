import React, { useEffect } from "react";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import { VisibilityFilter } from "./components/VisibilityFilter";
import { initializeNotes } from "./reducers/NoteReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
