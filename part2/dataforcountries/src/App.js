import Filter from "./components/Filter";
import Countries from "./components/Countries";
import useCountry from "./hooks";

const App = () => {
  //const { country, countries, setCountry } = useCountry();
  const { ...countriesprops } = useCountry();

  return (
    <div>
      <h2>Data for Countries</h2>
      <Filter
        handleOnChange={(e) => countriesprops.setCountry(e.target.value)}
      />
      <h2>Results</h2>
      <Countries {...countriesprops} />
    </div>
  );
};

export default App;
