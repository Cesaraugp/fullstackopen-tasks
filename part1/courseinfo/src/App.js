import React from "react";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      <p>
        {props.parts[0]} {props.exercises[0]}
      </p>
      <p>
        {props.parts[1]} {props.exercises[1]}
      </p>
      <p>
        {props.parts[2]} {props.exercises[2]}
      </p>
    </>
  );
};
const Total = (props) => {
  return <p>Number of exercises {props.e1 + props.e2 + props.e3}</p>;
};

function App() {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of Component";
  const exercises3 = 14;
  return (
    <div>
      <Header course={course} />
      <Content
        parts={[part1, part2, part3]}
        exercises={[exercises1, exercises2, exercises3]}
      />
      <Total e1={exercises1} e2={exercises2} e3={exercises3} />
    </div>
  );
}

export default App;
