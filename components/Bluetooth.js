import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useBloetooth } from "../hooks/useBluetooth";
import { vmin } from "../utils";
import Device from "./Device";
const Bluetooth = () => {
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
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        activeOpacity={!isLoading ? 0.2 : 1}
        onPress={() => {
          if (!isLoading) {
            scan();
          }
        }}
        style={{
          ...styles.button,
          backgroundColor: isLoading ? "black" : "blue",
        }}
      >
        <Text style={styles.text}>Scan for devices</Text>
      </TouchableOpacity>
      <View>
        {availableDevices.map((dev) => {
          return <Device device={dev} key={dev.address}></Device>;
        })}
      </View>

      <ActivityIndicator animating={isLoading} />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    width: "100%",
    alignItems: "center",
    height: 40,
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default Bluetooth;
