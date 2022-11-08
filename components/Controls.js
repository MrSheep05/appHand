import { View, Button } from "react-native";
import { useState, useEffect, useContext } from "react";
import NavigateButton from "./NavigateButton";
import FingerSlider from "./FingerSlider";
import CheckBox from "@react-native-community/checkbox";
import { StateContext } from "../utils/state";
const Controls = () => {
  const [values, setValues] = useState({
    pinky: 0,
    ring: 0,
    middle: 0,
    index: 0,
    thumb: 0,
  });
  const [checked, setChecked] = useState(false);
  const { dispatch } = useContext(StateContext);
  const getValues = ({ key, value }) => {
    const updateValue = values;
    updateValue[key] = parseInt(Math.round(value));
    setValues(updateValue);
  };

  const ShowButton = () => {
    return checked ? (
      <Button
        title="Submit"
        onPress={() => {
          dispatch({ type: "currentPose", payload: values });
        }}
      />
    ) : null;
  };

  useEffect(() => {
    if (!checked) {
      dispatch({ type: "currentPose", payload: values });
    }
  }, [values]);
  return (
    <View>
      <NavigateButton display="Camera" destination="/camera" />
      <CheckBox value={checked} onValueChange={() => setChecked(!checked)} />
      {Object.keys(values).map((key) => {
        return <FingerSlider functions={getValues} name={key} />;
      })}
      <ShowButton />
    </View>
  );
};
export default Controls;
