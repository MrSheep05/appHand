import { useContext, useState, useEffect } from "react";
import { divide, sendPicture } from "../utils";
import { View, Button, Dimensions, StatusBar, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { StateContext } from "../utils/state";
import { useRatio } from "../hooks/useRatio";

const { width } = Dimensions.get("window");
const status = StatusBar.currentHeight;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  cam: {
    position: "relative",
    top: status,
    width,
  },
});

const CameraBox = ({ takePhoto }) => {
  const [camera, setCamera] = useState(null);
  const { state, dispatch } = useContext(StateContext);
  const [permission, setPermission] = useState();
  const ratio = useRatio();

  const setHeight = (ratio = "4:3") => {
    return divide(ratio) * styles.cam.width;
  };

  useEffect(() => {
    (async () => {
      const camera = await Camera.requestCameraPermissionsAsync();
      setPermission(camera.status === "granted");
    })();
  }, []);

  if (!permission) {
    return <View></View>;
  }

  return (
    <View>
      <Camera
        ref={(ref) => {
          setCamera(ref);
        }}
        ratio={ratio}
        style={[styles.cam, { height: setHeight(ratio) }]}
        onCameraReady={() => {
          dispatch({ type: "setCamera", payload: camera });
        }}
      />
      <Button
        onPress={async () => {
          const options = {
            quality: 1,
            base64: true,
            exif: false,
          };
          const imgFile = await camera.takePictureAsync(options);
          const response = await sendPicture(imgFile);
          console.log(response);
        }}
        title={"takePic"}
      ></Button>
    </View>
  );
};

export default CameraBox;
