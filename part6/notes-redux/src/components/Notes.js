import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImportance } from "../reducers/NoteReducer";

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const filter = useSelector((state) => state.filter);

  return (
    <ul>
      {notes
        .filter((note) =>
          filter === "ALL"
            ? note
            : filter === "IMPORTANT"
            ? note.important
            : !note.important
        )
        .map((note) => (
          <Note
            key={note.id}
            note={note}
            handleClick={() => dispatch(toggleImportance(note.id))}
          />
        ))}
    </ul>
  );
};

export default Notes;
