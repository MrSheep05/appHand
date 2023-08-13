import { View, StyleSheet, TouchableOpacity } from "react-native";
import useNavigator from "../hooks/useNavigator";
import { vmin } from "../utils/styles";
import { Paths } from "../types/routes";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FooterNavigator = () => {
  return (
    <View style={footerStyles.footer}>
      <NavigateIcon
        path={Paths.CameraPage}
        iconsName={["camera-enhance", "camera-enhance-outline"]}
      />
      <NavigateIcon
        path={Paths.ControlsPage}
        size={vmin(11)}
        iconsName={["controller-classic", "controller-classic-outline"]}
      />
    </View>
  );
};

const footerStyles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    display: "flex",
    position: "absolute",
    height: vmin(15),
    width: "101%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: "#1D7870",
    bottom: 0,
    left: "-0.5%",
    backgroundColor: "#1C2128",
  },
});

export default FooterNavigator;

const NavigateIcon = ({
  path,
  iconsName,
  size = vmin(10),
}: {
  path: Paths;
  iconsName: [string, string];
  size?: number;
}) => {
  const { currentPath, navigate } = useNavigator();
  return (
    <TouchableOpacity
      onPress={() => navigate(path)}
      style={{ justifyContent: "center", alignContent: "center" }}
    >
      {path == currentPath ? (
        <Icon name={iconsName[0]} size={size} color="#1D7870" />
      ) : (
        <Icon name={iconsName[1]} size={size} color="white" />
      )}
    </TouchableOpacity>
  );
};
