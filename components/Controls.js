import { View, Button } from "react-native";
import { useState, useEffect, useContext } from "react";
import NavigateButton from "./NavigateButton";
import FingerSlider from "./FingerSlider";
import CheckBox from "@react-native-community/checkbox";
import { StateContext } from "../utils/state";
const Controls = () => {
  const [checked, setChecked] = useState(false);
  const { dispatch, state } = useContext(StateContext);
  const [values, setValues] = useState(state.pose);

  const getValues = ({ key, value }) => {
    const updateValue = values;
    updateValue[key] = parseInt(Math.round(value));
    console.log(updateValue);
    // setValues(updateValue);
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
