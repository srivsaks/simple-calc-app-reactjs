import { ACTIONS } from "./App";

export const OperandButton = ({ value, dispatch }) => {
  return (
    <button
      onClick={() => {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: value });
      }}
    >
      {value}
    </button>
  );
};
