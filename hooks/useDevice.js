import { useContext } from "react";
import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../utils/state";

export const useDevice = () => {
  const { dispatch } = useContext(StateContext);
  const navigate = useNavigate();
  RNBluetoothClassic.onDeviceDisconnected(() => {
    dispatch({ type: "setDevice", payload: undefined });
    navigate("/");
  });
  RNBluetoothClassic.onError((err) => {
    console.log(err);
  });
  return true;
};
