import { useContext, useState, useEffect } from "react";
import { divide, sendPicture } from "../utils";
import { View, Button, Dimensions, StatusBar, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { StateContext } from "../utils/state";
import { useRatio } from "../hooks/useRatio";
import NavigateButton from "./NavigateButton";
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

  const calculatePhoto = async () => {
    const options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    const imgFile = await camera.takePictureAsync(options);
    const response = await sendPicture(imgFile);
    const parsed = Object.values(JSON.parse(response));
    const positions = parsed.map((value) => {
      const fl = parseFloat(value) * 180;
      if (fl <= 0) return 0;
      return fl > 180 ? 180 : parseInt(Math.round(fl));
    });
    dispatch({
      type: "currentPose",
      payload: {
        pinky: positions[0],
        ring: positions[1],
        middle: positions[2],
        index: positions[3],
        thumb: positions[4],
      },
    });
    console.log(parsed);
    console.log(positions);
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
      <NavigateButton display="Manual controls" destination="/" />
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
      <Button onPress={calculatePhoto} title={"takePic"}></Button>
    </View>
  );
};

export default CameraBox;
