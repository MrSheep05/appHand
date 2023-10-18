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
  currentPosition: Fingers;
  address?: string;
};

export type Fingers = {
  pinky: number;
  ring: number;
  middle: number;
  index: number;
  thumb: number;
};
export enum FingerKeys {
  pinky = "pinky",
  ring = "ring",
  middle = "middle",
  index = "index",
  thumb = "thumb",
}

export const fingerKeys = Object.keys(FingerKeys).filter((key) =>
  isNaN(Number(key))
) as FingerKeys[];
