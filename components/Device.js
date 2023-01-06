import { useContext } from "react";
import { Text, Button, View, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigate } from "react-router-dom";
import { StateContext } from "../utils/state";
import { vmin, rem } from "../utils/index";

const Device = ({ device }) => {
  const { dispatch } = useContext(StateContext);
  const navigate = useNavigate();
  const connectToDevice = async () => {
    const isSuccessed = await device.connect();
    if (isSuccessed) {
      device.write(JSON.stringify({ pinky: 1 }));
      dispatch({ type: "setDevice", payload: device });
      navigate("/camera");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{device.name}</Text>
      <TouchableOpacity
        style={styles.button}
        title={"Connect"}
        onPress={connectToDevice}
      >
        <Text style={styles.text}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3f4144",
    padding: 20,
    width: vmin(80),
    borderRadius: 10,
    margin: 10,
  },
  button: {
    padding: 5,
    backgroundColor: "#5f8414",
    alignItems: "center",
    borderRadius: 10,
    width: vmin(40),
    alignSelf: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
export default Device;
