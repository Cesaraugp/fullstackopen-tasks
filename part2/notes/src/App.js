import { React, useState, useEffect } from "react";
import Note from "./components/Note.js";
import noteService from "../src/services/notes.js";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    noteService.getAll().then((response) => {
      setNotes(response);
    });
  };
  useEffect(hook, []);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => id === n.id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map((n) => (n.id !== id ? n : response)));
      })
      .catch((error) => {
        alert(`We're sorry, the note "${note.content}" is not on the server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      /*  id: notes.length + 1, */
    };

    noteService.create(noteObject).then((response) => {
      setNotes(notes.concat(response));
      setNewNote("");
    });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
