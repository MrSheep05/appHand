import { View, Text } from "react-native";
import { textStyle, vmin } from "../utils/styles";
import useDevice from "../hooks/useDevice";
import Background from "../components/background";
import FooterNavigator from "../components/footerNavigator";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { cameraRequestPermissions, divideRatio } from "../utils/cameraHelpers";

type CameraData = {
  permissions: boolean;
  height: number;
};

const initialCameraData = {
  permissions: false,
  height: 0,
} as CameraData;

const CameraView = () => {
  useDevice();
  const [cameraData, setCameraData] = useState<CameraData>(initialCameraData);
  const camera = useRef<Camera>(null);
  const width = vmin(90);
  useEffect(() => {
    cameraRequestPermissions((permission) =>
      setCameraData((previous) => ({
        ...previous,
        permissions: permission.status === "granted",
      }))
    );
  }, []);

  return (
    <View>
      <Background
        header={
          <Text style={{ ...textStyle, fontSize: 30, fontWeight: "500" }}>
            {"Camera Page"}
          </Text>
        }
      >
        <View
          style={{
            height: "100%",
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          {cameraData.permissions ? (
            <Camera
              style={{
                width,
                height: cameraData.height,
              }}
              ref={camera}
              onCameraReady={() => {
                console.log("READY");
                setCameraData((prev) => ({
                  ...prev,
                  height: width * divideRatio(camera.current!.props.ratio!),
                }));
              }}
            ></Camera>
          ) : (
            <Text>{"To use camera you need to provide perrmission"}</Text>
          )}
        </View>
      </Background>
      <FooterNavigator />
    </View>
  );
};

export default CameraView;
