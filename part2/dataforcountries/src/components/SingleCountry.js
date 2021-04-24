import React from "react";

const SingleCountry = ({ name, handler }) => {
  return (
    <p>
      {name}
      {"   "}
      <button onClick={() => handler(name)}>Show</button>
    </p>
  );
};
export default SingleCountry;
