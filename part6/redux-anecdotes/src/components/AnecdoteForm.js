import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { newAnecdoteNotification } from "../reducers/notificationsReducer";
import { connect } from "react-redux";

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    props.createAnecdote(content);
    props.newAnecdoteNotification(content, 3);
    event.target.content.value = "";
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

export default connect(null, { createAnecdote, newAnecdoteNotification })(
  AnecdoteForm
);
