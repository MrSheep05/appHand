import { useContext } from "react";
import { Text, Button, View } from "react-native";

import { useNavigate } from "react-router-dom";
import { StateContext } from "../utils/state";

const Device = ({ device }) => {
  const { dispatch } = useContext(StateContext);
  const connectToDevice = async () => {
    const isSuccessed = await device.connect();
    if (isSuccessed) {
      dispatch({ type: "setDevice", payload: device });
      useNavigate("/camera");
    }
  };
  return (
    <View>
      <Text>{device.name}</Text>
      <Button title={"Connect"} onPress={connectToDevice}></Button>
    </View>
  );
};
export default Device;
