import anecdotesService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch({
      type: "ADD_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const voteAnecdote = (id, votes) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdotesService.vote(id, votes + 1);
    dispatch({
      type: "VOTE_ANECDOTE",
      data: { id },
    });
  };
};

const anecdotesReducer = (state = [], action) => {
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
      return state.concat(anecdote);
    case "INIT_ANECDOTES":
      return action.data;

    default:
      return state;
  }
};

export default anecdotesReducer;
