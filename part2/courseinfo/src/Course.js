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

export default Course;
