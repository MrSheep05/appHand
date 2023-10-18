import {useContext, useState} from 'react';
import {
  bluetoothConnect,
  bluetoothScan,
  translateDevice,
} from '../utils/bluetoothHelpers';
import {StateContext} from '../utils/state';
import {Actions} from '../utils/state.types';
import useBluetooth from './useBluetooth';
import {Paths} from '../types/routes';
import useNavigator from './useNavigator';

type UseScan = {
  devices: Device[];
  scan: (timeout?: number) => Promise<void>;
  connect: (arg0: Device) => Promise<void>;
  isScanning: boolean;
};

const useScan = (): UseScan => {
  const {dispatch} = useContext(StateContext);
  const [devices, setDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const {navigate} = useNavigator();

  const scan = async (duration: number = 3000) => {
    try {
      setIsScanning(true);
      const result = await bluetoothScan(duration);
      setDevices(
        result
          .filter(device => device.name != device.address && device.name)
          .map(namedDevice => translateDevice(namedDevice)),
      );
      setIsScanning(false);
    } catch (err) {
      console.error(err);
    }
  };

  const connect = async (device: Device) => {
    const result = await bluetoothConnect(device);
    if (result) {
      dispatch({type: Actions.setDevice, payload: device});
      navigate(Paths.CameraPage);
    }
  };

  useBluetooth(scan);
  return {devices, scan, connect, isScanning};
};

export default useScan;
