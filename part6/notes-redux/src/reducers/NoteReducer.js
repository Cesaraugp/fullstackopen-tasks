import noteService from "../services/notes";

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch({
      type: "INIT_NOTES",
      data: notes,
    });
  };
};

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.data];
    case "TOGGLE_IMPORTANCE":
      const noteToChange = state.find((note) => note.id === action.data.id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange["important"],
      };
      return state.map((note) =>
        note.id !== action.data.id ? note : changedNote
      );
    case "INIT_NOTES":
      return action.data;
    default:
      return state;
  }
};
export default noteReducer;

export const filterReducer = (state = "ALL", action) => {
  console.log("FILTERED TO: ", action.filter);
  switch (action.type) {
    case "SET_FILTER":
      return action.filter;
    default:
      return state;
  }
};

export const filterChange = (filter) => {
  return {
    type: "SET_FILTER",
    filter,
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch({
      type: "NEW_NOTE",
      data: newNote,
    });
  };
};
export const toggleImportance = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    data: { id },
  };
};
