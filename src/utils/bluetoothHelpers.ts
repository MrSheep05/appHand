import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';

export const bluetoothScan = async (
  duration: number,
): Promise<BluetoothDevice[]> => {
  return await new Promise((resolve, reject) => {
    try {
      const scanResult = RNBluetoothClassic.startDiscovery();
      setTimeout(() => {
        RNBluetoothClassic.cancelDiscovery();
        resolve(scanResult);
      }, duration);
    } catch (err) {
      reject(err);
    }
  });
};

export const bluetoothConnect = async (device: Device): Promise<boolean> => {
  try {
    await RNBluetoothClassic.connectToDevice(device.address);
    return true;
  } catch (err) {
    return false;
  }
};

export const translateDevice = (device: BluetoothDevice): Device => {
  const {name, address} = device;
  return {name, address};
};

export const isBluetoothEnabled = async (): Promise<boolean> =>
  await RNBluetoothClassic.isBluetoothEnabled();

export const bluetoothWrite = async (
  device: Device,
  message: Message,
): Promise<boolean> => {
  try {
    await RNBluetoothClassic.writeToDevice(
      device.address,
      JSON.stringify(message),
    );
    return true;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
