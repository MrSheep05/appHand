// import {StyleSheet, Text, View} from 'react-native';
// import {Camera, useCameraDevice} from 'react-native-vision-camera';

import {useContext, useEffect, useRef, useState} from 'react';
import useDevice from '../hooks/useDevice';
import {Actions, FingerKeys, Fingers, fingerKeys} from '../utils/state.types';
import {StateContext} from '../utils/state';
import {buttonStyle, textStyle, vmin} from '../utils/styles';
import {parsePositionToName, sendPicture} from '../utils/httpService';
import {Text, TouchableOpacity, View} from 'react-native';
import CameraWidget from '../components/cameraWidget';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Checkbox from 'expo-checkbox';
import NameTile from '../components/nameTile';
import FooterNavigator from '../components/footerNavigator';
import {Camera, PhotoFile} from 'react-native-vision-camera';
import useCamera from '../hooks/useCamera';

type CameraData = {
  height: number;
  image?: PhotoFile;
  testData: boolean;
  recording: boolean;
};

const initialCameraData = {
  height: 0,
  testData: false,
  recording: false,
} as CameraData;

const TestCamera = () => {
  // useDevice();
  const permissions = useCamera();
  const {state, dispatch} = useContext(StateContext);
  const [namePosition, setNamePosition] = useState<Fingers>(
    state.currentPosition,
  );
  const [cameraData, setCameraData] = useState<CameraData>(initialCameraData);
  const camera = useRef<Camera>(null);
  const iconSize = vmin(10);
  const circleRadius = vmin(15);
  console.log(state.currentPosition);

  const getValues = ({key, value}: {key: FingerKeys; value: string}) => {
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
    const {status, positions} = await sendPicture(cameraData.image!, name);

    if (status === 200) {
      if (positions) {
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
        setCameraData(previous => ({...previous, image: undefined}));
      }
    }
  };

  useEffect(() => {
    if (cameraData.image && !cameraData.testData) {
      predictBend();
    }
  }, [cameraData.image]);

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        backgroundColor: '#1C2128',
      }}>
      {permissions ? (
        <CameraWidget
          innerRef={camera}
          image={cameraData.image}
          isRecording={cameraData.recording}>
          <View
            style={{
              display: 'flex',
              margin: 20,
              height: '100%',
              paddingBottom: vmin(15) + 30,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                flex: 1,
              }}>
              <TouchableOpacity
                style={{
                  ...buttonStyle,
                  height: circleRadius,
                  width: circleRadius,
                  borderRadius: circleRadius / 2,
                  alignItems: 'center',
                }}
                onPress={async () => {
                  if (!camera.current) return;
                  const image = await camera.current.takePhoto();
                  setCameraData(prev => ({...prev, image}));
                }}>
                <Icon
                  name="camera-outline"
                  color={'#1D7870'}
                  size={iconSize}></Icon>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...buttonStyle,
                  height: circleRadius,
                  width: circleRadius,
                  borderRadius: circleRadius / 2,
                  alignItems: 'center',
                }}
                onPress={() => {
                  const {recording} = cameraData;
                  setCameraData(prev => ({...prev, recording: !recording}));
                }}>
                <Icon
                  name="camera-enhance-outline"
                  color={'#1D7870'}
                  size={iconSize}></Icon>
              </TouchableOpacity>
              <Checkbox
                color={cameraData.testData ? '#1D7870' : '#1C2128'}
                style={{height: iconSize, width: iconSize}}
                value={cameraData.testData}
                onValueChange={value =>
                  setCameraData(previous => ({
                    ...previous,
                    testData: value,
                    image: undefined,
                  }))
                }></Checkbox>
            </View>
            <View
              style={{
                marginVertical: 10,
                flex: 6,
              }}>
              <View
                style={{
                  display:
                    cameraData.testData && cameraData.image ? 'flex' : 'none',
                  height: '100%',
                }}>
                <View style={{flex: 6}}>
                  {fingerKeys.map(key => (
                    <NameTile key={key} innerKey={key} func={getValues} />
                  ))}
                </View>
                <TouchableOpacity
                  style={{...buttonStyle, flex: 1}}
                  onPress={async () => {
                    const name = parsePositionToName(namePosition);
                    await predictBend(name);
                    setCameraData(previous => ({
                      ...previous,
                      image: undefined,
                      testData: false,
                    }));
                  }}>
                  <Text style={textStyle}>{'Send test data'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </CameraWidget>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            height: '100%',
          }}>
          <Text style={textStyle}>
            {'To use camera you need to provide perrmission'}
          </Text>
        </View>
      )}

      <FooterNavigator />
    </View>
  );
};

export default TestCamera;
