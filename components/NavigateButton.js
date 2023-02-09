import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { useNavigate } from "react-router-dom";
import { vmin } from "../utils";

const { width } = Dimensions.get("window");
const NavigateButton = ({ destination = "", display }) => {
  const navigate = useNavigate();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigate(destination);
      }}
    >
      <Text style={styles.text}>{display}</Text>
    </TouchableOpacity>
  );
};
styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C6E8C",
    maxHeight: 50,
    height: vmin(25),
  },
});
export default NavigateButton;
