import { useState, useEffect } from "react";
import axios from "axios";

const useCountry = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, [country]);

  return { country, countries, setCountry };
};

export default useCountry;
