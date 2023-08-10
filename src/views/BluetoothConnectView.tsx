import { View, Text } from "react-native";
import useScan from "../hooks/useScan";
import { textStyle, viewStyle } from "../utils/styles";

const BluetoothConnectView = () => {
  const { devices, scan, connect } = useScan();

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{"Bluetooth Connect Page"}</Text>
    </View>
  );
};

export default BluetoothConnectView;
