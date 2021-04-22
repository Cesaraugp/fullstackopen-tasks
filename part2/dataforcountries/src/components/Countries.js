import React from "react";
import SingleCountry from "./SingleCountry.js";
import DetailedSingleCountry from "./DetailedSingleCountry";

let Countries = ({ countries, country, buttonHandler }) => {
  let matchingList;

  if (/\d/.test(country)) {
    return (
      <>
        <p>Please write a valid Country</p>
      </>
    );
  }
  if (country !== "") {
    matchingList = countries.filter(function (item) {
      return item.name.toLowerCase().includes(country.toLowerCase());
    });
  }

  if (!matchingList) {
    return (
      <>
        <p>Nothing to show in here 👀 yet</p>
      </>
    );
  }

  if (matchingList.length === 0) {
    return (
      <>
        <p>Sorry, there's 0 matches for your query ❌</p>
      </>
    );
  }

  if (matchingList.length === 1) {
    return (
      <>
        <DetailedSingleCountry data={matchingList[0]} />
      </>
    );
  } else if (matchingList.length > 1 && matchingList.length <= 10) {
    return (
      <>
        {matchingList.map((country, i) => {
          if (i <= 10) {
            return (
              <SingleCountry
                handler={buttonHandler}
                key={country.name}
                name={country.name}
              />
            );
          } else return false;
        })}
      </>
    );
  } else if (matchingList.length > 10) {
    return (
      <>
        <p>Too many matches, please be more specific...</p>
      </>
    );
  }
};

export default Countries;
