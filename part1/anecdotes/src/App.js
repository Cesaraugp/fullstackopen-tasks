import { React, useState } from "react";
const getRandomNumber = () => {
  const min = Math.ceil(0);
  const max = Math.floor(6);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};
const VoteButton = ({ number, points, setPoints }) => {
  const copy = [...points];
  copy[number] += 1;
  return (
    <button
      onClick={() => {
        setPoints([...copy]);
      }}
    >
      Vote
    </button>
  );
};
const NextButton = ({ handleClick }) => {
  return <button onClick={handleClick}>Next Anecdote</button>;
};
const RandomQuote = ({ anecdotes, number, title, hasVotes = true }) => {
  if (!hasVotes) {
    return (
      <>
        <h1>{title}</h1>
        <p>No votes were given yet</p>
      </>
    );
  }
  return (
    <>
      <h1>{title}</h1>
      <p>{anecdotes[number]}</p>
    </>
  );
};
const QuoteOfTheDay = ({ points, anecdotes }) => {
  const isAllZero = points.every((item) => item === 0);
  let indexOfMaxValue = 0;
  if (!isAllZero) indexOfMaxValue = points.indexOf(Math.max(...points));
  return (
    <RandomQuote
      anecdotes={anecdotes}
      number={indexOfMaxValue}
      title="Anecdote with most votes"
      hasVotes={!isAllZero}
    />
  );
};
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [points, setPoints] = useState(new Uint8Array(6));
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <RandomQuote
        anecdotes={anecdotes}
        number={selected}
        title="Anecdote of the day"
      />
      <QuoteOfTheDay points={[...points]} anecdotes={anecdotes} />
      <VoteButton number={selected} points={points} setPoints={setPoints} />
      <NextButton
        handleClick={() => {
          setSelected(getRandomNumber);
        }}
      />
    </div>
  );
};

export default App;
