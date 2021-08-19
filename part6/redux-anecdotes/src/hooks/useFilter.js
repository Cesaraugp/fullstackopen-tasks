import { useDispatch } from "react-redux";

export const useFilter = () => {
  return ["filterValue", useDispatch()];
};
