import { useContext, useState, useEffect } from "react";
import { divide, sendPicture } from "../utils";
import CheckBox from "@react-native-community/checkbox";
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Button,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import { StateContext } from "../utils/state";
import { useRatio } from "../hooks/useRatio";
import NavigateButton from "./NavigateButton";
import NameBox from "./NameBox";
import { useDevice } from "../hooks/useDevice";

const { width } = Dimensions.get("window");
const currentHeight = StatusBar.currentHeight;
const options = {
  quality: 1,
  base64: true,
  exif: false,
};

const CameraBox = ({ takePhoto }) => {
  const [camera, setCamera] = useState(null);
  const [permission, setPermission] = useState();
  const [checked, setChecked] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  const [image, setImage] = useState();
  const { state, dispatch } = useContext(StateContext);
  const [values, setValues] = useState(state.pose);
  const ratio = useRatio();
  const device = useDevice();

  const setHeight = (ratio = "4:3") => {
    return divide(ratio) * width;
  };

  const sendData = () => {
    console.log(values);
    const name = Object.values(values).reduce((name, angle) => {
      return `${name}_${angle}`;
    });
    sendPicture(image, `${name}_.jpeg`);
    setImage(undefined);
    setIsTaken(false);
  };

  const getValues = ({ key, value }) => {
    const bend = parseInt(value);
    if (isNaN(bend)) return false;
    if (bend >= 0 && bend <= 180) {
      const updateValue = values;
      updateValue[key] = Math.round((bend * 100) / 180) / 100;
      setValues(updateValue);
      return true;
    }
    return false;
  };

  const takePicture = async () => {
    const imgFile = await camera.takePictureAsync(options);
    if (checked) {
      setImage(imgFile);
      setIsTaken(true);
    } else {
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
    }
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
      <NavigateButton display="Manual controls" destination="/controls" />
      {isTaken ? (
        <ImageBackground
          source={image}
          style={{ ...styles.cam, height: setHeight(ratio) }}
        >
          <View
            style={{
              ...styles.view,
              height: setHeight(ratio) - width,
              display: "flex",
              flexDirection: "row",
            }}
          >
            {Object.keys(state.pose).map((key) => {
              return (
                <NameBox
                  func={(value) => {
                    return getValues({ key, value });
                  }}
                  key={key}
                ></NameBox>
              );
            })}
            <Button title="hej" onPress={sendData}></Button>
          </View>
        </ImageBackground>
      ) : (
        <Camera
          ref={(ref) => {
            setCamera(ref);
          }}
          ratio={ratio}
          style={{ ...styles.cam, height: setHeight(ratio) }}
          onCameraReady={() => {
            dispatch({ type: "setCamera", payload: camera });
          }}
        >
          <View style={{ ...styles.view, height: setHeight(ratio) - width }}>
            <TouchableOpacity onPress={takePicture} style={styles.snap}>
              <Text style={styles.text}>Snap</Text>
            </TouchableOpacity>
            <View style={styles.checkView}>
              <Text style={{ ...styles.text }}>Testing data</Text>
              <CheckBox
                value={checked}
                onValueChange={(value) => setChecked(value)}
              ></CheckBox>
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  cam: {
    position: "relative",
    top: currentHeight,
    width,
    display: "flex",
    flexDirection: "column",
  },
  view: {
    backgroundColor: "#3f4144",
    width,
    top: width,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  snap: {
    backgroundColor: "#5f8414",
    height: 40,
    borderRadius: 10,
    flex: 3,
    alignSelf: "center",
    left: currentHeight * 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 18, fontWeight: "bold" },
  checkView: {
    flexDirection: "row-reverse",
    flex: 4,
    justifyContent: "flex-start",
    alignItems: "center",
    right: currentHeight * 0.5,
  },
});
export default CameraBox;
