const generateId = () => Math.floor(Math.random() * 1000000);

const initialState = [
  { content: "Family", important: true, id: generateId() },
  { content: "Beans and mayo", important: false, id: generateId() },
];

const noteReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};
export default noteReducer;

export const createNote = (content, important = false) => {
  return {
    type: "NEW_NOTE",
    data: {
      content,
      important,
      id: generateId(),
    },
  };
};
export const toggleImportance = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    data: { id },
  };
};
