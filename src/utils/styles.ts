import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    alignSelf: "center",
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    display: "flex",
  },
});

export const textStyle = styles.text as StyleProp<TextStyle>;
export const viewStyle = styles.view as StyleProp<ViewStyle>;
