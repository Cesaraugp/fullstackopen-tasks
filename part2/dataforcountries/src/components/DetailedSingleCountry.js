import React from "react";
import Weather from "./Weather";

const DetailedSingleCountry = ({ data }) => {
  const { name, capital, population, languages, flag } = data;
  return (
    <>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map((lang) => {
          return <li key={lang.iso639_2}>{lang.name}</li>;
        })}
      </ul>
      <img alt={name} width="100px" height="auto" src={flag} />
      <Weather capital={capital} />
    </>
  );
};

export default DetailedSingleCountry;
