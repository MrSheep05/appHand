import Constants from 'expo-constants';
import * as FS from 'expo-file-system';
import {Tuple} from '../types/tuple';
import {Fingers} from './state.types';
import {PhotoFile} from 'react-native-vision-camera';

const SERVER_PORT = 5000;

enum EndPoints {
  calculate = 'calculate',
  save = 'save',
}
type Output = {
  positions?: Tuple<number, 5>;
  status: number;
};

export const sendPicture = async (
  imageUrl: string,
  name?: string,
  address?: string,
): Promise<Output> => {
  const endpoint = name ? EndPoints.save : EndPoints.calculate;
  const url = `http://192.168.196.214:${SERVER_PORT}/${endpoint}`;
  try {
    const response = await FS.uploadAsync(url, imageUrl, {
      headers: {'content-type': 'image/jpeg', name: name ?? 'none'},
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });
    if (!name) {
      const parsed = Object.values(JSON.parse(response.body)) as string[];
      console.log(parsed);
      const positions = parsed.map(value => {
        const fl = parseFloat(value) * 180;
        if (fl <= 0) return 0;
        return fl > 180 ? 180 : Math.round(fl);
      }) as Tuple<number, 5>;
      return {status: response.status, positions};
    }
    return {status: response.status};
  } catch (err) {
    console.warn(err);
    return {status: 500};
  }
};

export const parsePositionToName = (position: Fingers) => {
  const values = Object.values(position).reduce(
    (name, angle) => `${name}_${angle}`,
    '',
  );
  return `${values.slice(1)}_.jpeg`;
};
