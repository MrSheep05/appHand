import { ColorValue, DimensionValue, View } from "react-native";

const Divider = ({
  width,
  color = "white",
}: {
  width: DimensionValue;
  color?: ColorValue;
}) => {
  return (
    <View
      style={{
        marginVertical: 15,
        width: width,
        height: 2,
        backgroundColor: color,
        alignSelf: "center",
      }}
    ></View>
  );
};

export default Divider;
