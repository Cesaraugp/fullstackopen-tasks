import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterChange } from "../reducers/NoteReducer";

export const VisibilityFilter = () => {
  const dispatch = useDispatch();
  const filterSelected = (value) => {
    dispatch(filterChange(value));
  };
  const state = useSelector((state) => state.filter);
  return (
    <div>
      all{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected("ALL")}
        checked={state === "ALL" ? true : false}
      />
      important{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected("IMPORTANT")}
      />
      nonimportant{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected("NONIMPORTANT")}
      />
    </div>
  );
};
