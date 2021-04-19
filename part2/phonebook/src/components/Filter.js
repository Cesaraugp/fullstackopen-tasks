import React from "react";

const Filter = ({ handleOnChange }) => {
  return (
    <div>
      filter shown with <input name="filter" onChange={handleOnChange} />
    </div>
  );
};
export default Filter;
