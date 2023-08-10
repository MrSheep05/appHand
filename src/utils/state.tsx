import { createContext, useReducer } from "react";
import { Action, Actions, State } from "./state.types";
export const StateContext = createContext(
  {} as { state: State; dispatch: (action: Action) => void }
);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case Actions.setDevice: {
      return { ...state, currentDevice: action.payload };
    }

    default: {
      return state;
    }
  }
};

const initialState = {
  // bleManager: new BleManager(),
};

export const StateComponent = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
