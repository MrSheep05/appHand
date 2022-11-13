import { useEffect, useState } from "react";
import {
  PermissionsAndroid,
  View,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";
import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";
import Device from "./Device";
const Bluetooth = () => {
  const [permission, setPermission] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const scan = async (connectName = false) => {
    setLoading(true);
    const devices = await RNBluetoothClassic.startDiscovery();
    const desired = devices.filter(({ name, address }) => {
      console.log(name, address);

      return !connectName ? name !== address : name === connectName;
    });
    if (connectName && desired.length === 1) {
      const connection = await desired[0].connect();
      console.log(connection);
    }
    setLoading(false);
  };

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
  return (
    <View>
      <Button
        title="Scan for devices"
        onPress={() => {
          if (!isLoading) {
            scan();
          }
        }}
      />
      <ActivityIndicator animating={isLoading} />
    </View>
  );
};
export default Bluetooth;
