import "./styles.css";
import React, { useReducer } from "react";
import { OperandButton } from "./OperandButton";

const INITIAL_STATE = {
  previous: null,
  currentDigit: "0",
  operand: null
};

export const ACTIONS = {
  CLEAR: "CLEAR",
  CALCULATE: "CALCULATE",
  CHOOSE_OPERATION: "CHOOSE_OPERATION",
  ADD_DIGIT: "ADD_DIGIT"
};

const calculateValue = () => {
  return "10";
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.CHOOSE_OPERATION:
      if (state.operand !== null) return state;
      return {
        ...state,
        operand: action.payload
      };
    case ACTIONS.ADD_DIGIT:
      if (action.payload === "0" && state.currentDigit === "0") return state;
      if (action.payload === "." && state.currentDigit.includes("."))
        return state;
      if (state.currentDigit === "0" && action.payload !== ".")
        return {
          ...state,
          currentDigit: action.payload
        };
      if (state.previous === null && state.operand !== null)
        return {
          ...state,
          currentDigit: action.payload,
          previous: state.currentDigit
        };
      return {
        ...state,
        currentDigit: `${state.currentDigit}${action.payload}`
      };
    case ACTIONS.CLEAR:
      return {
        ...state,
        previous: null,
        currentDigit: "0",
        operand: action.payload
      };
    case ACTIONS.CALCULATE:
      if (state.currentDigit === ".") return state;
      return {
        ...state,
        previous: state.currentDigit,
        currentDigit: calculateValue()
      };

    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="current-digit">
          {state.operand}
          {state.previous}
        </div>
        <div className="current-digit">{state.currentDigit}</div>
      </div>
      <button
        className="span-two"
        onClick={() => {
          dispatch({ type: ACTIONS.CLEAR });
        }}
      >
        AC
      </button>
      <button>Del</button>
      <button
        onClick={() => {
          dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: "/" });
        }}
      >
        /
      </button>
      <OperandButton value="1" dispatch={dispatch} />
      <OperandButton value="2" dispatch={dispatch} />
      <OperandButton value="3" dispatch={dispatch} />
      <button
        onClick={() => {
          dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: "*" });
        }}
      >
        x
      </button>
      <OperandButton value="4" dispatch={dispatch} />
      <OperandButton value="5" dispatch={dispatch} />
      <OperandButton value="6" dispatch={dispatch} />
      <button
        onClick={() => {
          dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: "+" });
        }}
      >
        +
      </button>
      <OperandButton value="7" dispatch={dispatch} />
      <OperandButton value="8" dispatch={dispatch} />
      <OperandButton value="9" dispatch={dispatch} />
      <button
        onClick={() => {
          dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: "-" });
        }}
      >
        -
      </button>
      <OperandButton value="." dispatch={dispatch} />
      <OperandButton value="0" dispatch={dispatch} />
      <button className="span-two">=</button>
    </div>
  );
}
