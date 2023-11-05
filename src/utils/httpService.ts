import Constants from 'expo-constants';
import * as FS from 'expo-file-system';
import {Tuple} from '../types/tuple';
import {Fingers} from './state.types';
import {PhotoFile} from 'react-native-vision-camera';
import {SERVER_ADDRESS} from '.';

enum EndPoints {
  calculate = 'calculate',
  save = 'save',
}
type Output = {
  positions?: Message;
  status: number;
};

export const sendPicture = async (
  imageUrl: string,
  name?: string,
  address?: string,
): Promise<Output> => {
  const endpoint = name ? EndPoints.save : EndPoints.calculate;
  const url = `${SERVER_ADDRESS}/${endpoint}`;
  try {
    const response = await FS.uploadAsync(url, imageUrl, {
      headers: {'content-type': 'image/jpeg', name: name ?? 'none'},
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });
    if (!name) {
      const positions = JSON.parse(response.body);
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
