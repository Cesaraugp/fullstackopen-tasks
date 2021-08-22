import React from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  votedAnecdoteNotification,
  cleanNotification,
} from "../reducers/notificationsReducer";
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

const AnecdoteList = () => {
  const state = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => state.anecdotes);
  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .filter((anecdote) =>
          state !== "" && anecdote ? anecdote.content.includes(state) : true
        )
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </>
  );
};

export default AnecdoteList;