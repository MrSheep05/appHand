import { useContext, useEffect, useState } from "react";
import RNBluetoothClassic from "react-native-bluetooth-classic";
import { StateContext } from "../utils/state";
import { useLocation, useNavigate } from "react-router-dom";
import { Paths } from "../types/routes";
import { Actions } from "../utils/state.types";

const useBluetooth = (
  func?: () => Promise<void>
): (() => Promise<void>) | (() => void) => {
  const { dispatch } = useContext(StateContext);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateIf = (path: Paths) => {
    const pathname =
      location.pathname != "/" ? location.pathname.replaceAll("/", "") : "/";
    if (pathname == path) return;
    navigate(path);
  };

  const requestBluetooth = async () => {
    setIsRequesting(true);
    try {
      await RNBluetoothClassic.requestBluetoothEnabled();
    } catch (err) {
      console.warn("User did not turn on ble");
    }
    setIsRequesting(false);
  };

  RNBluetoothClassic.onBluetoothDisabled(() => {
    setIsEnabled(false);
    dispatch({ type: Actions.setDevice });
    navigateIf(Paths.BluetoothOffPage);
  });

  RNBluetoothClassic.onBluetoothEnabled(() => {
    setIsEnabled(true);
    navigateIf(Paths.BluetoothConnectionPage);
  });

  const checkInitialState = async () => {
    const isEnabled = await RNBluetoothClassic.isBluetoothEnabled();
    setIsEnabled(isEnabled);
    if (isEnabled) {
      if (func) await func();
      return;
    }
    navigateIf(Paths.BluetoothOffPage);
  };

  useEffect(() => {
    console.log("useBlue Effect");
    checkInitialState();
    return () => {};
  }, []);

  return !isEnabled && !isRequesting ? requestBluetooth : () => {};
};

export default useBluetooth;
