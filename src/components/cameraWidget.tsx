import { Camera, CameraCapturedPicture } from "expo-camera";
import { Children } from "../types";
import { useState } from "react";
import { vmin } from "../utils/styles";
import { divideRatio } from "../utils/cameraHelpers";
import { ImageBackground, View } from "react-native";

const CameraOverlay = ({ children }: { children?: Children }) => {
  return (
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
  );
};

const CameraWidget = ({
  innerRef,
  children,
  image,
}: {
  innerRef: React.RefObject<Camera>;
  children?: Children;
  image?: CameraCapturedPicture;
}) => {
  const [height, setHeight] = useState(0);
  const width = vmin(100);
  return (
    <View>
      {image ? (
        <ImageBackground source={image} style={{ width, height }}>
          <CameraOverlay>{children}</CameraOverlay>
        </ImageBackground>
      ) : (
        <Camera
          style={{
            width,
            height,
          }}
          ref={innerRef}
          onCameraReady={() => {
            console.log("READY");
            setHeight(width * divideRatio(innerRef.current!.props.ratio!));
          }}
        >
          <CameraOverlay>{children}</CameraOverlay>
        </Camera>
      )}
    </View>
  );
};

export default CameraWidget;
