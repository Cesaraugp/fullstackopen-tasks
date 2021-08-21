import React from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../reducers/NoteReducer";
import noteService from "../services/notes";

const NewNote = (props) => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    const newNote = await noteService.createNew(content);
    dispatch(createNote(newNote));
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};

export default NewNote;
