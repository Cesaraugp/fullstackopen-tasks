import { connect } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const AnecdoteFilter = (props) => {
  const handleChange = (e) => {
    const value = e.target.value;
    props.filterChange(value);
  };
  return (
    <div>
      <input onChange={handleChange} />
    </div>
  );
};

export default connect(null, { filterChange })(AnecdoteFilter);
