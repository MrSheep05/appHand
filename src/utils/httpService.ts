import { CameraCapturedPicture } from "expo-camera";
import Constants from "expo-constants";
import * as FS from "expo-file-system";
import { Tuple } from "../types/tuple";
import { Fingers } from "./state.types";

const SERVER_PORT = 5000;

enum EndPoints {
  calculate = "calculate",
  save = "save",
}
type Output = {
  positions?: Tuple<number, 5>;
  status: boolean;
};

export const sendPicture = async (
  image: CameraCapturedPicture,
  name?: string,
  address?: string
) => {
  const endpoint = name ? EndPoints.save : EndPoints.calculate;
  const host = address
    ? address
    : Constants.expoGoConfig?.debuggerHost?.split(":")[0];
  const url = `http://${host}:${SERVER_PORT}/${endpoint}`;
  try {
    const response = await FS.uploadAsync(url, image.uri, {
      headers: { "content-type": "image/jpeg", name: name ?? "none" },
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });

    if (name) {
      const parsed = Object.values(JSON.parse(response.body)) as string[];
      const positions: number[] = parsed.map((value) => {
        const fl = parseFloat(value) * 180;
        if (fl <= 0) return 0;
        return fl > 180 ? 180 : Math.round(fl);
      });
      return { status: true, positions };
    }
    return { status: true };
  } catch (err) {
    console.warn(err);
    return { status: false };
  }
};

export const parsePositionToName = (position: Fingers) => {
  const values = Object.values(position).reduce(
    (name, angle) => `${name}_${angle}`,
    ""
  );
  return `${values}_.jpeg`;
};
