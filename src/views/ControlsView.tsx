import { View, Text, TouchableOpacity } from "react-native";
import { buttonStyle, textStyle, vmin } from "../utils/styles";
import useDevice from "../hooks/useDevice";
import Background from "../components/background";
import FooterNavigator from "../components/footerNavigator";
import { Actions, Fingers, fingerKeys } from "../utils/state.types";
import Control from "../components/control";
import { useContext, useState } from "react";
import { StateContext } from "../utils/state";
import { GetValueFunction } from "../types";
import Divider from "../components/divider";
import Checkbox from "expo-checkbox";

const ControlsView = () => {
  useDevice();
  const { dispatch, state } = useContext(StateContext);
  const [values, setValues] = useState<Fingers>(state.currentPosition);
  const [checked, setChecked] = useState(false);

  const getValues: GetValueFunction = ({ key, value }) => {
    const updateValue = values;
    updateValue[key] = value;
    setValues(updateValue);
    if (checked) return;
    dispatch({ type: Actions.setPosition, payload: { [key]: value } });
  };

  return (
    <View>
      <Background
        header={
          <Text style={{ ...textStyle, fontSize: 30, fontWeight: "500" }}>
            {"Controls Page"}
          </Text>
        }
      >
        <View
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Divider width={"50%"} />
            <Checkbox
              color={checked ? "#1D7870" : "#1C2128"}
              style={{ height: vmin(10), width: vmin(10) }}
              value={checked}
              onValueChange={(value) => setChecked(value)}
            />
          </View>
          {fingerKeys.map((key) => (
            <Control
              func={getValues}
              innerKey={key}
              key={key}
              initValue={state.currentPosition[key]}
            />
          ))}
          <TouchableOpacity
            style={{ ...buttonStyle, display: checked ? "flex" : "none" }}
          >
            <Text style={{ ...textStyle, fontSize: 20 }}>{"Send data"}</Text>
          </TouchableOpacity>
        </View>
      </Background>
      <FooterNavigator />
    </View>
  );
};

export default ControlsView;
