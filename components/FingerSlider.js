import Slider from "@react-native-community/slider";
import { useState, useRef } from "react";
import { View, Text } from "react-native";
const FingerSlider = ({ style, functions, name, startValue }) => {
  const [value, setValue] = useState(startValue);
  return (
    <View>
      <Slider
        maximumValue={180}
        minimumValue={0}
        style={style}
        value={value}
        onValueChange={(value) => {
          functions({ value, key: name });
          setValue(value);
        }}
      />
      <Text>{`Current value is ${parseInt(value)}`}</Text>
    </View>
  );
};
export default FingerSlider;
