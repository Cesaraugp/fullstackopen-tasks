const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const createAnecdote = (content) => {
  return {
    type: "ADD_ANECDOTE",
    data: {
      content,
      votes: 0,
    },
  };
};

export const voteAnecdote = (id) => {
  return {
    type: "VOTE_ANECDOTE",
    data: { id },
  };
};

const messages = [
  {
    message: "",
    type: "NEW",
    active: false,
  },
  {
    message: "",
    type: "VOTED",
    active: false,
  },
];
export const newAnecdoteNotification = (anecdote) => {
  return {
    type: "NEW",
    data: { anecdote },
  };
};

export const votedAnecdoteNotification = (anecdote) => {
  return {
    type: "VOTED",
    data: { anecdote },
  };
};
export const cleanNotification = () => {
  return {
    type: "CLEAN",
  };
};

export const messagesReducer = (state = messages, action) => {
  switch (action.type) {
    case "NEW":
      const newanecdote = action.data.anecdote;
      const [newStateMessage] = state.filter((msg) => msg.type === "NEW");
      const newmessage = `A new anecdote "${newanecdote}" has been created`;
      const newState = state
        .filter((msg) => msg.type !== "NEW")
        .map((msg) => ({ ...msg, active: false }));
      return [
        ...newState,
        {
          ...newStateMessage,
          message: newmessage,
          active: true,
        },
      ];
    case "VOTED":
      const voteanecdote = action.data.anecdote;
      const [votedStateMessage] = state.filter((msg) => msg.type === "VOTED");
      votedStateMessage.active = true;
      const votemessage = `The anecdote: "${voteanecdote}" has been voted`;
      const newStateVote = state
        .filter((msg) => msg.type !== "VOTED")
        .map((msg) => ({ ...msg, active: false }));
      return [
        ...newStateVote,
        {
          ...votedStateMessage,
          message: votemessage,
          active: true,
        },
      ];
    case "CLEAN":
      return state.map((msg) => ({ ...msg, message: "", active: false }));

    default:
      return state;
  }
};

const initialState = anecdotesAtStart.map(asObject);

const anecdotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE_ANECDOTE":
      const { id } = action.data;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
      const { votes } = anecdoteToChange;
      anecdoteToChange.votes = Number(votes) + 1;
      const newState = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : anecdoteToChange
      );

      return newState;

    case "ADD_ANECDOTE":
      const anecdote = action.data;
      anecdote.id = getId();

      return state.concat(anecdote);

    default:
      return state;
  }
};

export default anecdotesReducer;
