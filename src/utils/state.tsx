import {createContext, useReducer} from 'react';
import {Action, Actions, State} from './state.types';
import {bluetoothWrite} from './bluetoothHelpers';
export const StateContext = createContext(
  {} as {state: State; dispatch: (action: Action) => void},
);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case Actions.setDevice: {
      return {...state, currentDevice: action.payload};
    }

    case Actions.setPosition: {
      if (state.currentDevice) {
        console.log('Bluetooth');
        bluetoothWrite(state.currentDevice, action.payload);
        return {
          ...state,
          currentPosition: {...state.currentPosition, ...action.payload},
        };
      }
    }
    default: {
      return state;
    }
  }
};

const initialState = {
  currentPosition: {
    pinky: 180,
    ring: 180,
    middle: 180,
    index: 180,
    thumb: 180,
  },
} as State;

export const StateComponent = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{state, dispatch}}>
      {children}
    </StateContext.Provider>
  );
};
