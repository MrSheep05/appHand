import { View, Text } from "react-native";
import { FingerKeys } from "../utils/state.types";
import { textStyle, vmin } from "../utils/styles";
import { useState } from "react";
import { capitilize } from "../utils";
import { Slider } from "@miblanchard/react-native-slider";
import { GetValueFunction } from "../types";

type Params = {
  innerKey: FingerKeys;
  func: GetValueFunction;
  initValue: number;
};

const Control = ({ innerKey, func, initValue }: Params) => {
  const [value, setValue] = useState<number>(initValue);
  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        height: "10%",
        marginVertical: vmin(5),
      }}
    >
      <Text style={{ ...textStyle, flex: 1 }}>{`${capitilize(
        innerKey
      )}: ${value}`}</Text>
      <Slider
        maximumTrackStyle={{ backgroundColor: "#1C2128" }}
        minimumTrackStyle={{ backgroundColor: "#1D7870", opacity: 0.2 }}
        trackClickable={true}
        minimumValue={30}
        maximumValue={180}
        step={1}
        thumbStyle={{
          width: vmin(10),
          height: vmin(10),
          backgroundColor: "#1D7870",
        }}
        trackStyle={{ width: "100%", backgroundColor: "red", height: vmin(5) }}
        value={value}
        onValueChange={([change]) => {
          setValue(change);
          func({ key: innerKey, value: change });
        }}
      ></Slider>
    </View>
  );
};

export default Control;
