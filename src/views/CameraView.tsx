import { View, Text, TouchableOpacity } from "react-native";
import { buttonStyle, textStyle, vmin } from "../utils/styles";
import useDevice from "../hooks/useDevice";
import FooterNavigator from "../components/footerNavigator";
import { useContext, useEffect, useRef, useState } from "react";
import { Camera, CameraCapturedPicture } from "expo-camera";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { cameraRequestPermissions, takePicture } from "../utils/cameraHelpers";
import CameraWidget from "../components/cameraWidget";
import { parsePositionToName, sendPicture } from "../utils/httpService";
import { StateContext } from "../utils/state";
import { Actions, FingerKeys, Fingers, fingerKeys } from "../utils/state.types";
import Checkbox from "expo-checkbox";
import NameTile from "../components/nameTile";

type CameraData = {
  permissions: boolean;
  height: number;
  image?: CameraCapturedPicture;
  testData: boolean;
};

const initialCameraData = {
  permissions: false,
  height: 0,
  testData: false,
} as CameraData;

const CameraView = () => {
  useDevice();
  const { state, dispatch } = useContext(StateContext);
  const [namePosition, setNamePosition] = useState<Fingers>(
    state.currentPosition
  );
  const [cameraData, setCameraData] = useState<CameraData>(initialCameraData);
  const camera = useRef<Camera>(null);
  const width = vmin(100);
  const iconSize = vmin(10);
  const circleRadius = vmin(15);

  const getValues = ({ key, value }: { key: FingerKeys; value: string }) => {
    const bend = parseInt(value);
    if (isNaN(bend)) return false;
    if (bend >= 0 && bend <= 180) {
      const updateValue = namePosition;
      updateValue[key] = Math.round((bend * 100) / 180) / 100;
      setNamePosition(updateValue);
      return true;
    }
    return false;
  };

  const predictBend = async (name?: string) => {
    const { status, positions } = await sendPicture(
      cameraData.image!,
      name,
      state.address
    );

    if (status === 200) {
      if (positions) {
        console.log("DISPATCH");
        dispatch({
          type: Actions.setPosition,
          payload: {
            pinky: positions[0],
            ring: positions[1],
            middle: positions[2],
            index: positions[3],
            thumb: positions[4],
          },
        });
        setCameraData((previous) => ({ ...previous, image: undefined }));
      }
    }
    console.log(`STATUS CODE ${status}`);
  };
  useEffect(() => {
    cameraRequestPermissions((permission) =>
      setCameraData((previous) => ({
        ...previous,
        permissions: permission.status === "granted",
      }))
    );
  }, []);

  useEffect(() => {
    if (cameraData.image && !cameraData.testData) {
      predictBend();
    }
  }, [cameraData.image]);

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        backgroundColor: "#1C2128",
      }}
    >
      {cameraData.permissions ? (
        <CameraWidget innerRef={camera} image={cameraData.image}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                ...buttonStyle,
                height: circleRadius,
                width: circleRadius,
                borderRadius: circleRadius / 2,
                alignItems: "center",
              }}
              onPress={async () => {
                if (!camera.current) return;
                console.log("Took picture");
                const image = await takePicture(camera.current);
                setCameraData((prev) => ({ ...prev, image }));
              }}
            >
              <Icon
                name="camera-outline"
                color={"#1D7870"}
                size={iconSize}
              ></Icon>
            </TouchableOpacity>
            <Checkbox
              color={cameraData.testData ? "#1D7870" : "#1C2128"}
              style={{ height: iconSize, width: iconSize }}
              value={cameraData.testData}
              onValueChange={(value) =>
                setCameraData((previous) => ({
                  ...previous,
                  testData: value,
                  image: undefined,
                }))
              }
            ></Checkbox>
          </View>
          <View
            style={{
              display:
                cameraData.testData && cameraData.image ? "flex" : "none",
              height: "50%",
              marginVertical: 10,
            }}
          >
            <View style={{ flex: 5 }}>
              {fingerKeys.map((key) => (
                <NameTile key={key} innerKey={key} func={getValues} />
              ))}
            </View>
            <TouchableOpacity
              style={{ ...buttonStyle, flex: 1 }}
              onPress={async () => {
                const name = parsePositionToName(namePosition);
                await predictBend(name);
                setCameraData((previous) => ({
                  ...previous,
                  image: undefined,
                  testData: false,
                }));
              }}
            >
              <Text style={textStyle}>{"Send test data"}</Text>
            </TouchableOpacity>
          </View>
        </CameraWidget>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            height: "100%",
          }}
        >
          <Text style={textStyle}>
            {"To use camera you need to provide perrmission"}
          </Text>
        </View>
      )}

      <FooterNavigator />
    </View>
  );
};

export default CameraView;
