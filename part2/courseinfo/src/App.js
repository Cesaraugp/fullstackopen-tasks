import React from "react";
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => {
        return <Part part={part.name} exercise={part.exercises} />;
      })}
    </>
  );
};
const Total = (props) => {
  const total = props.parts.reduce((s, p) => {
    if (s.exercises) return s.exercises + p.exercises;
    else return s + p.exercises;
  });

  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};
const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      {<Total parts={course.parts} />}
    </>
  );
};
const App = () => {
  const course = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <Course course={course[0]} />
      <Course course={course[1]} />
    </div>
  );
};

export default App;
