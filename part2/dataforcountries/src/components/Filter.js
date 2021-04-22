import React from "react";

const Filter = ({ handleOnChange }) => {
  return (
    <div>
      find countries <input name="filter" onChange={handleOnChange} />
    </div>
  );
};
export default Filter;
