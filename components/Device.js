import { useContext } from "react";
import { Text, Button, View } from "react-native";

import { useNavigate } from "react-router-dom";
import { StateContext } from "../utils/state";

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
    <View>
      <Text>{device.name}</Text>
      <Button title={"Connect"} onPress={connectToDevice}></Button>
    </View>
  );
};
export default Device;
