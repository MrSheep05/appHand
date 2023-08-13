import { ColorValue, StatusBar, View } from "react-native";
import { bodyStyle, headerStyle } from "../utils/styles";
import { Children } from "../types";

const Background = ({
  children,
  header,
  color = "#1C2128",
}: {
  children: Children;
  header?: Children;
  color?: ColorValue;
}) => {
  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: color,
      }}
    >
      <View
        style={{
          ...headerStyle,
          marginTop: StatusBar.currentHeight,
          marginBottom: -StatusBar.currentHeight!,
        }}
      >
        {header}
      </View>
      <View style={bodyStyle}>
        <View style={{ margin: 20 }}>{children}</View>
      </View>
    </View>
  );
};

export default Background;
