import React from "react";
import {
  voteAnecdote,
  votedAnecdoteNotification,
  cleanNotification,
} from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const vote = ({ id, content }) => {
    dispatch(voteAnecdote(id));
    dispatch(votedAnecdoteNotification(content));
    setTimeout(() => {
      dispatch(cleanNotification());
    }, 5000);
  };

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </>
  );
};
