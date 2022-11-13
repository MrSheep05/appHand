import { useContext } from "react";
import { Text, Button, View } from "react-native";

import { useNavigate } from "react-router-dom";
import { StateContext } from "../utils/state";

const Device = ({ name }) => {
  return (
    <View>
      <Text>{name}</Text>
      <Button title={"Connect"}></Button>
    </View>
  );
};
export default Device;
