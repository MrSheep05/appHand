import { useContext, useEffect } from "react";
import RNBluetoothClassic from "react-native-bluetooth-classic";
import { StateContext } from "../utils/state";
import { useLocation, useNavigate } from "react-router-dom";
import { Paths } from "../types/routes";
import { Actions } from "../utils/state.types";

const useBluetooth = (func?: () => Promise<void>) => {
  const { dispatch } = useContext(StateContext);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateIf = (path: Paths) => {
    const pathname =
      location.pathname != "/" ? location.pathname.replaceAll("/", "") : "/";
    if (pathname == path) return;
    navigate(path);
  };

  RNBluetoothClassic.onBluetoothDisabled(() => {
    dispatch({ type: Actions.setDevice });
    navigateIf(Paths.BluetoothOffPage);
  });

  RNBluetoothClassic.onBluetoothEnabled(() => {
    navigateIf(Paths.BluetoothConnectionPage);
  });

  const checkInitialState = async () => {
    const isEnabled = await RNBluetoothClassic.isBluetoothEnabled();
    console.log(isEnabled);
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
};

export default useBluetooth;
