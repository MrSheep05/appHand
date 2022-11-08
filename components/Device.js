import { useContext } from "react";
import { Button, View, Text } from "react-native";
import { StateContext } from "../utils/state";
import { useNavigate } from "react-router-dom";

const Device = ({ id, name }) => {
  const { state, dispatch } = useContext(StateContext);
  const connectTo = async (event) => {
    try {
      await state.manager.connectToDevice(id);
    } catch {
      console.log(error);
    } finally {
      useNavigate("/camera");
    }
  };
  return (
    <View id={id} key={id}>
      <Text title={name}>{name}</Text>
      <Button id={id} title={"Connect"} onPress={connectTo}></Button>
    </View>
  );
};

export default Device;
