import {
  View,
  Text,
  FlatList,
  ScrollView,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import useScan from "../hooks/useScan";
import { buttonStyle, textStyle } from "../utils/styles";
import DeviceTile from "../components/device_tile";
import Background from "../components/background";
import { useState } from "react";

const BluetoothConnectView = () => {
  const { devices, isScanning, scan, connect } = useScan();
  const [duration, setDuration] = useState(3000);
  return (
    <Background
      header={
        <Text style={{ ...textStyle, fontSize: 30, fontWeight: "500" }}>
          {"Bluetooth Connect Page"}
        </Text>
      }
    >
      <View style={{ height: "100%" }}>
        <TouchableOpacity
          disabled={isScanning}
          style={buttonStyle}
          onPress={async () => {
            await scan(duration);
            setDuration(duration * 1.25);
          }}
        >
          <Text
            style={{
              ...textStyle,
              fontFamily: "poppins",
              fontWeight: "500",
              fontSize: 24,
            }}
          >
            {"SCAN"}
          </Text>
        </TouchableOpacity>

        {!isScanning ? (
          <ScrollView style={{ width: "100%", height: "80%" }}>
            {devices.map((device, key) => (
              <DeviceTile device={device} connect={connect} key={key} />
            ))}
          </ScrollView>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </Background>
  );
};

export default BluetoothConnectView;
