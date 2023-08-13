import { View, Text, TouchableOpacity } from "react-native";
import { buttonStyle, textStyle, vmin } from "../utils/styles";
import useDevice from "../hooks/useDevice";
import FooterNavigator from "../components/footerNavigator";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraCapturedPicture } from "expo-camera";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { cameraRequestPermissions, takePicture } from "../utils/cameraHelpers";
import CameraWidget from "../components/cameraWidget";

type CameraData = {
  permissions: boolean;
  height: number;
  image?: CameraCapturedPicture;
};

const initialCameraData = {
  permissions: false,
  height: 0,
} as CameraData;

const CameraView = () => {
  useDevice();
  const [cameraData, setCameraData] = useState<CameraData>(initialCameraData);
  const camera = useRef<Camera>(null);
  const width = vmin(100);
  useEffect(() => {
    cameraRequestPermissions((permission) =>
      setCameraData((previous) => ({
        ...previous,
        permissions: permission.status === "granted",
      }))
    );
  }, []);

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
        <CameraWidget innerRef={camera}>
          <TouchableOpacity
            style={{
              ...buttonStyle,
              height: vmin(15),
              width: vmin(15),
              borderRadius: vmin(15) / 2,
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
              size={vmin(10)}
            ></Icon>
          </TouchableOpacity>
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
      {/* <Background
        header={
          <Text style={{ ...textStyle, fontSize: 30, fontWeight: "500" }}>
            {"Camera Page"}
          </Text>
        }
      >
       
      </Background> */}
    </View>
  );
};

export default CameraView;
