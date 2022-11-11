import * as FS from "expo-file-system";
import Constants from "expo-constants";

const SERVER_PORT = 5000;
const SERVER_ENDPOINTS = {
  calculate: "calculate",
  save: "save",
};

export const sendPicture = async (image, name) => {
  const endpoint = name ? SERVER_ENDPOINTS.save : SERVER_ENDPOINTS.calculate;
  const [host] = Constants.manifest.debuggerHost.split(":");
  const url = `http://${host}:${SERVER_PORT}/${endpoint}`;
  const response = await FS.uploadAsync(url, image.uri, {
    headers: { "content-type": "image/jpeg", name },
    uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
  });

  return response.body;
};

export const divide = (ratio) => {
  const [a, b] = ratio.split(":").map((x) => {
    return parseInt(x);
  });

  return a / b;
};
