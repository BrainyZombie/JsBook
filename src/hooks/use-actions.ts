import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(actionCreators, dispatch), [
    dispatch,
  ]);
};
