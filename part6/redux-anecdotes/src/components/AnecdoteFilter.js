import { useFilter } from "../hooks/useFilter";
import { filterChange } from "../reducers/anecdoteReducer";

const AnecdoteFilter = () => {
  const [filter, setFilter] = useFilter();
  const handleChange = (e) => {
    const value = e.target.value;
    setFilter(filterChange(value));
  };
  return (
    <div>
      <input onChange={handleChange} />
    </div>
  );
};

export default AnecdoteFilter;
