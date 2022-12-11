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
      console.log("send");
      if (state.device) {
        console.log("1");
        state.device.write(JSON.stringify(action.payload));
      }
      return { ...state, pose: action.payload };
    }
    case "setDevice": {
      return { ...state, device: action.payload };
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
  device: undefined,
  pose: {
    pinky: 0,
    ring: 0,
    middle: 0,
    index: 0,
    thumb: 0,
  },
};

export const StateComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
