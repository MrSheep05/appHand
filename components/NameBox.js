import { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

const NameBox = ({ func }) => {
  const [value, setValue] = useState("");
  return (
    <View>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={value}
        onChangeText={(value) => {
          setValue(value);
          if (!func(value)) {
            setValue("");
          }
        }}
      ></TextInput>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: "grey",
    color: "#0C0E65",
    margin: 5,
    width: 30,
    height: 30,
    borderRadius: 5,
  },
});
export default NameBox;
