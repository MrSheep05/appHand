import { useContext, useEffect, useState } from "react";
import {
  bluetoothConnect,
  bluetoothScan,
  isBluetoothEnabled,
  translateDevice,
} from "../utils/bluetoothHelpers";
import { StateContext } from "../utils/state";
import { Actions } from "../utils/state.types";
import useBluetooth from "./useBluetooth";
import RNBluetoothClassic from "react-native-bluetooth-classic";

type UseScan = {
  devices: Device[];
  scan: (arg0: number) => void;
  connect: (arg0: Device) => Promise<void>;
};

const useScan = (): UseScan => {
  const { dispatch } = useContext(StateContext);
  const [devices, setDevices] = useState<Device[]>([]);

  const scan = async (duration: number = 3000) => {
    try {
      const result = await bluetoothScan(duration);
      setDevices(
        result
          .filter((device) => device.name != device.address && device.name)
          .map((namedDevice) => translateDevice(namedDevice))
      );
    } catch {
      console.warn("Cannot perform scan!");
    }
  };

  const connect = async (device: Device) => {
    const result = await bluetoothConnect(device);
    if (result) {
      console.log(`Connected to ${device}`);
      dispatch({ type: Actions.setDevice, payload: device });
    }
  };

  useBluetooth(scan);

  return { devices, scan, connect };
};

export default useScan;
