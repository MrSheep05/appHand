import { createContext, useReducer } from "react";

export const StateContext = createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case "setCamera": {
      return { ...state, camera: action.payload };
    }
    case "setAvialableRatios": {
      return { ...state, allRatios: action.payload };
    }
    case "currentPose": {
      return { ...state, pose: action.payload };
    }
    case "bleManager": {
      return { ...state, manager: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

const initialState = {
  camera: undefined,
  avialableRatio: undefined,
  manager: undefined,
};

export const StateComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
