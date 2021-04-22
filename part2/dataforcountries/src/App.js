import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  return (
    <div>
      <h2>Data for Countries</h2>
      <Filter handleOnChange={(e) => setCountry(e.target.value)} />
      <h2>Results</h2>
      <Countries
        countries={countries}
        country={country}
        buttonHandler={setCountry}
      />
    </div>
  );
};

export default App;
