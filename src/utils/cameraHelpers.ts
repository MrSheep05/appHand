import { Camera, PermissionResponse } from "expo-camera";

type CameraRequestType = (camera: PermissionResponse) => void;

export const cameraRequestPermissions = async (
  callback?: CameraRequestType
): Promise<void> => {
  const camera = await Camera.requestCameraPermissionsAsync();
  if (callback) callback(camera);
};

export const takePicture = async (camera: Camera) => {
  const image = await camera.takePictureAsync({
    quality: 1,
    base64: true,
    exif: false,
  });
};

export const divideRatio = (ratio: string) => {
  const ratios = ratio.split(":").map((num) => parseInt(num));
  return ratios[0] / ratios[1];
};
