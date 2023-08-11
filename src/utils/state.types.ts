export type Action = SetDeviceAction | SetPositionAction;

export enum Actions {
  setDevice = "setDevice",
  setPosition = "setPosition",
}

type SetDeviceAction = {
  type: Actions.setDevice;
  payload?: Device;
};

type SetPositionAction = {
  type: Actions.setPosition;
  payload: Message;
};

export type State = {
  currentDevice?: Device;
  currentPosition: {
    pinky: number;
    ring: number;
    middle: number;
    index: number;
    thumb: number;
  };
};

export enum FingerKeys {
  pinky,
  ring,
  middle,
  index,
  thumb,
}
