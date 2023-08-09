export type Action = SetDeviceAction;

export enum Actions {
  setDevice = "setDevice",
}

type SetDeviceAction = {
  type: Actions.setDevice;
  payload: String;
};

export type State = {
  // bleManager: BleManager;
};
