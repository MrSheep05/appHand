export type Action = SetDeviceAction;

export enum Actions {
  setDevice = "setDevice",
}

type SetDeviceAction = {
  type: Actions.setDevice;
  payload?: Device;
};

export type State = {
  currentDevice?: Device;
};
