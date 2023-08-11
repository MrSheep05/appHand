import { useContext } from "react";
import RNBluetoothClassic from "react-native-bluetooth-classic";
import { StateContext } from "../utils/state";
import { Actions } from "../utils/state.types";
import useBluetooth from "./useBluetooth";
import { bluetoothWrite } from "../utils/bluetoothHelpers";
import useNavigator from "./useNavigator";
import { Paths } from "../types/routes";

const useDevice = () => {
  const { dispatch, state } = useContext(StateContext);
  const { navigate } = useNavigator();

  useBluetooth(() =>
    bluetoothWrite(state.currentDevice!, state.currentPosition)
  );

  RNBluetoothClassic.onDeviceDisconnected(() => {
    dispatch({ type: Actions.setDevice });
    navigate(Paths.BluetoothConnectionPage);
  });
};

export default useDevice;
