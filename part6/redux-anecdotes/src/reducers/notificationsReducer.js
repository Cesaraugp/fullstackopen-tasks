const initialState = [
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
export const newAnecdoteNotification = (anecdote, time) => {
  return async (dispatch) => {
    dispatch({
      type: "NEW",
      data: { anecdote },
    });
    const prom = await new Promise((resolve) =>
      setTimeout(() => resolve(), time * 1000)
    );
    dispatch(cleanNotification());
  };
};

export const votedAnecdoteNotification = (anecdote, time) => {
  return async (dispatch) => {
    dispatch({
      type: "VOTED",
      data: { anecdote },
    });
    const prom = await new Promise((resolve) =>
      setTimeout(() => resolve(), time * 1000)
    );
    dispatch(cleanNotification());
  };
};

export const cleanNotification = () => {
  return {
    type: "CLEAN",
  };
};

const messagesReducer = (state = initialState, action) => {
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
export default messagesReducer;
