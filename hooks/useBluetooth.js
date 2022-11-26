import { useEffect, useState } from "react";
import { PermissionsAndroid } from "react-native";
import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";

const isAchiveable = async () => {
  const achievability = await RNBluetoothClassic.isBluetoothAvailable();
  return achievability;
};
const powerOn = async () => {
  const check = await RNBluetoothClassic.isBluetoothEnabled();
  if (!check) {
    RNBluetoothClassic.requestBluetoothEnabled().catch((error) => {});
  }
};

export const useBloetooth = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  useEffect(() => {
    async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Access fine location required for discovery",
          message:
            "In order to perform discovery, you must enable/allow " +
            "fine location access.",
          buttonNeutral: 'Ask Me Later"',
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      setPermission(granted);
    };
  }, []);

  useEffect(() => {
    if (!isAvailable) {
      powerOn();
    }
  }, [isAvailable]);

  RNBluetoothClassic.onBluetoothEnabled(() => {
    setIsAvailable(true);
  });
  RNBluetoothClassic.onBluetoothDisabled(() => {
    setIsAvailable(false);
  });

  return isAvailable ? RNBluetoothClassic : undefined;
};
