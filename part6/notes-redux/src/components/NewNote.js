import React from "react";
import { createNote } from "../reducers/NoteReducer";
import { connect } from "react-redux";

const NewNote = (props) => {
  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    props.createNote(content);
    event.target.note.value = "";
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};

export default connect(null, { createNote })(NewNote);
