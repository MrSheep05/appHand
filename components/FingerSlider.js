import Slider from "@react-native-community/slider";
import { useState, useRef } from "react";
import { View, Text } from "react-native";
const FingerSlider = ({ style, functions, name }) => {
  const [value, setValue] = useState();
  return (
    <View key={name}>
      <Slider
        key={name}
        maximumValue={180}
        minimumValue={0}
        style={style}
        value={value}
        onValueChange={(value) => {
          functions({ value, key: name });
          setValue(value);
        }}
      />
      <Text key={name}>{`Current value is ${parseInt(value)}`}</Text>
    </View>
  );
};
export default FingerSlider;
