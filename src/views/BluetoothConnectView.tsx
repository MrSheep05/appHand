import { View, Text } from "react-native";
import useBluetooth from "../hooks/useBluetooth";
const BluetoothConnectView = () => {
  const a = useBluetooth();
  return (
    <View>
      <Text>{"Bluetooth Connect Page"}</Text>
    </View>
  );
};

export default BluetoothConnectView;
