import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createAnecdote,
  newAnecdoteNotification,
  cleanNotification,
} from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    dispatch(createAnecdote(content));
    event.target.content.value = "";
    dispatch(newAnecdoteNotification(content));
    setTimeout(() => {
      dispatch(cleanNotification());
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
