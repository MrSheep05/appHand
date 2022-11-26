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
import { useBloetooth } from "../hooks/useBluetooth";
import Device from "./Device";
const Bluetooth = () => {
  const [permission, setPermission] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [availableDevices, setAvailableDevices] = useState([]);
  const bluetoothManager = useBloetooth();
  const scan = async () => {
    setLoading(true);
    const devices = await bluetoothManager.startDiscovery();
    const desired = devices.filter(({ name, address }) => {
      return name !== address;
    });
    setLoading(false);
    setAvailableDevices(desired);
  };
  if (!bluetoothManager) {
    return (
      <View>
        <Text>{"Enable Bluetooth first!"}</Text>
      </View>
    );
  }
  return (
    <View>
      <Button
        title="Scan for devices"
        onPress={() => {
          if (!isLoading) {
            scan("FilipBle");
          }
        }}
      />
      <ActivityIndicator animating={isLoading} />
      {availableDevices.map((dev) => {
        return <Device device={dev} key={dev.address}></Device>;
      })}
    </View>
  );
};
export default Bluetooth;
