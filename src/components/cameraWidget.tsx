import { Camera } from "expo-camera";
import { Children } from "../types";
import { useState } from "react";
import { vmin } from "../utils/styles";
import { divideRatio } from "../utils/cameraHelpers";
import { View } from "react-native";

const CameraWidget = ({
  innerRef,
  children,
}: {
  innerRef: React.RefObject<Camera>;
  children?: Children;
}) => {
  const [height, setHeight] = useState(0);
  const width = vmin(100);
  return (
    <Camera
      style={{
        width,
        height: height,
      }}
      ref={innerRef}
      onCameraReady={() => {
        console.log("READY");
        setHeight(width * divideRatio(innerRef.current!.props.ratio!));
      }}
    >
      <View
        style={{
          marginTop: vmin(100),
          backgroundColor: "#2D333B",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          display: "flex",
          height: "100%",
        }}
      >
        <View style={{ width: "100%", height: "100%", padding: 20 }}>
          {children}
        </View>
      </View>
    </Camera>
  );
};

export default CameraWidget;
