import { TouchableOpacity, View, StyleSheet, Text, Button } from "react-native";
import { textStyle, vmin } from "../utils/styles";

const DeviceTile = ({
  device,
  connect,
}: {
  device: Device;
  connect: (arg0: Device) => Promise<void>;
}) => {
  console.log(device);
  return (
    <TouchableOpacity
      onPress={async () => await connect(device)}
      style={deviceStyles.view}
    >
      <View
        style={{
          alignContent: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Text style={{ ...textStyle, fontSize: 20, fontWeight: "500" }}>
          {device.name}
        </Text>
        <Text style={{ ...textStyle, fontSize: 18 }}>{device.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DeviceTile;

const deviceStyles = StyleSheet.create({
  view: {
    alignSelf: "center",
    marginVertical: 10,
    height: vmin(20),
    width: vmin(80),
    backgroundColor: "#1C2128",
    borderRadius: 20,
    elevation: 10,
    shadowColor: "#1D7870",
  },
});
