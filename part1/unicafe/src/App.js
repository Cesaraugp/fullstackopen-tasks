import { React, useState } from "react";

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};
const Button = ({ review, handleClick }) => {
  return <button onClick={handleClick}>{review}</button>;
};
const Statistics = ({ good, neutral, bad }) => {
  if (good || bad || neutral) {
    return (
      <table>
        <tbody>
          <Statistic name="good" amount={good} />
          <Statistic name="neutral" amount={neutral} />
          <Statistic name="bad" amount={bad} />
          <Statistic name="all" amount={good + bad + neutral} />
          <Statistic
            name="average"
            amount={(good - bad) / (good + bad + neutral)}
          />
          <Statistic
            name="positive"
            amount={good / (good + bad + neutral)}
            isPercentage={true}
          />
        </tbody>
      </table>
    );
  }
  return (
    <>
      <p>No feedback given</p>
    </>
  );
};
const Statistic = ({ name, amount, isPercentage = false }) => {
  amount = isNaN(amount) ? 0 : amount; //Nan check
  isPercentage = isPercentage ? "%" : "";
  amount = isPercentage ? amount * 100 : amount;
  return (
    <tr>
      <td>{name}</td>
      <td>
        {amount} {isPercentage}
      </td>
    </tr>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div>
      <Header name="give feedback" />
      <Button review="good" handleClick={() => setGood(good + 1)} />
      <Button review="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button review="bad" handleClick={() => setBad(bad + 1)} />
      <Header name="Statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
