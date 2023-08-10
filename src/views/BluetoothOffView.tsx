import { View, Text } from "react-native";
import useBluetooth from "../hooks/useBluetooth";
import { textStyle, viewStyle } from "../utils/styles";

const BluetoothOffView = () => {
  useBluetooth();
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{"Bluetooth off view page"}</Text>
    </View>
  );
};

export default BluetoothOffView;
