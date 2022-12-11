import { View, Button, TouchableHighlight } from "react-native";
import { useState, useEffect, useContext } from "react";
import NavigateButton from "./NavigateButton";
import FingerSlider from "./FingerSlider";
import CheckBox from "@react-native-community/checkbox";
import { StateContext } from "../utils/state";
import { useDevice } from "../hooks/useDevice";
const Controls = () => {
  const [checked, setChecked] = useState();
  const { dispatch, state } = useContext(StateContext);
  const [values, setValues] = useState(state.pose);
  const { pinky, index, thumb, middle, ring } = values;
  useDevice();

  useEffect(() => {
    if (!checked) {
      dispatch({ type: "currentPose", payload: values });
    }
  }, [values]);

  const getValues = ({ key, value }) => {
    const updateValue = values;
    updateValue[key] = parseInt(Math.round(value));
    setValues({ ...updateValue });
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

  return (
    <View>
      <NavigateButton display="Camera" destination="/camera" />
      <CheckBox
        value={checked}
        onValueChange={(current) => {
          setChecked(current);
          console.log("current", current);
        }}
      />
      {Object.keys(values).map((key) => {
        return (
          <FingerSlider
            functions={getValues}
            name={key}
            key={key}
            startValue={state.pose[key]}
          />
        );
      })}
      <ShowButton />
    </View>
  );
};
export default Controls;
