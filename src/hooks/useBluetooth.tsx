import { useContext, useEffect } from "react";
import { StateContext } from "../utils/state";
import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";

const scan = async (duration: number): Promise<BluetoothDevice[]> => {
  return await new Promise((resolve) => {
    const a = RNBluetoothClassic.startDiscovery();
    setTimeout(() => {
      console.log("3 sec");
      RNBluetoothClassic.cancelDiscovery();
      resolve(a);
    }, duration);
  });
};

const useBluetooth = () => {
  const { state, dispatch } = useContext(StateContext);

  useEffect(() => {
    const a = async () => {
      console.log("USE EFFECT");
      const devices = await scan(3000);
      const finnal = devices
        .filter((device) => device.name != device.address && device.name)
        .map((device) => device.name);
      console.log(finnal);
      //
    };
    a().catch((err) => console.error(err));
  }, []);
};

export default useBluetooth;
