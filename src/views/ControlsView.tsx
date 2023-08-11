import { View, Text } from "react-native";
import { textStyle } from "../utils/styles";
import useDevice from "../hooks/useDevice";
import Background from "../components/background";
import FooterNavigator from "../components/footerNavigator";

const ControlsView = () => {
  useDevice();

  return (
    <View>
      <Background
        header={
          <Text style={{ ...textStyle, fontSize: 30, fontWeight: "500" }}>
            {"Controls Page"}
          </Text>
        }
      >
        <View style={{ height: "100%", display: "flex" }}></View>
      </Background>
      <FooterNavigator />
    </View>
  );
};

export default ControlsView;
