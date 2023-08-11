import { View, Text, Button, TouchableOpacity } from "react-native";
import useBluetooth from "../hooks/useBluetooth";
import { buttonStyle, textStyle, viewStyle } from "../utils/styles";
import Background from "../components/background";
import Divider from "../components/divider";

const BluetoothOffView = () => {
  const requestBluetooth = useBluetooth();
  return (
    <Background
      color={"#1C2128"}
      header={
        <Text style={{ ...textStyle, fontSize: 30, fontWeight: "500" }}>
          {"Bluetooth Off Page"}
        </Text>
      }
    >
      <View
        style={{
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Text style={{ ...textStyle, textAlign: "center", marginBottom: 10 }}>
          {"If you want to use this app,\nyou must to turn on bluetooth!"}
        </Text>
        <Divider width={"80%"}></Divider>
        <TouchableOpacity style={buttonStyle} onPress={requestBluetooth}>
          <Text
            style={{
              ...textStyle,
              fontFamily: "poppins",
              fontWeight: "500",
              fontSize: 24,
            }}
          >
            {"Enable bluetooth"}
          </Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default BluetoothOffView;
