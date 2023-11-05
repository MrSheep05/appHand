import {
  Camera,
  Frame,
  PhotoFile,
  runAsync,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {Children} from '../types';
import {vmax, vmin} from '../utils/styles';
import {ImageBackground, Platform, StyleSheet, Text, View} from 'react-native';
import {useCallback, useContext, useEffect, useState} from 'react';
import usePredictBend from '../hooks/usePredictBend';
import {Worklets} from 'react-native-worklets-core';
import {predictArmBend} from '../utils/armFrameProcessorPlugin';
import useDevice from '../hooks/useDevice';
import {StateContext} from '../utils/state';
import {Actions} from '../utils/state.types';
import {SERVER_ADDRESS} from '../utils';

const CameraOverlay = ({children}: {children?: Children}) => {
  return (
    <View
      style={{
        position: 'absolute',
        marginTop: vmin(100),
        backgroundColor: '#2D333B',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        display: 'flex',
        height: vmax(100) - vmin(100),
        width: '100%',
      }}>
      {children}
    </View>
  );
};
//ඞ

const CameraWidget = ({
  children,
  innerRef,
  image,
  isRecording,
}: {
  children?: Children;
  innerRef: React.RefObject<Camera>;
  isRecording: boolean;
  image?: PhotoFile;
}) => {
  useDevice();
  const {dispatch} = useContext(StateContext);
  const {sendData} = usePredictBend();
  const update = Worklets.createRunInJsFn((data: Message) =>
    dispatch({
      type: Actions.setPosition,
      payload: data,
    }),
  );
  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    runAsync(frame, () => {
      'worklet';
      if (frame !== null) {
        const res = predictArmBend(frame, {
          address: `${SERVER_ADDRESS}/calculate`,
        });
        if (res) {
          const data = JSON.parse(res) as Message;
          update(data);
        }
      }
    });
  }, []);
  const device = useCameraDevice('back', {
    physicalDevices: ['ultra-wide-angle-camera'],
  });

  // const devices = useCameraDevices();
  return (
    <View style={{width: '100%', height: '100%'}}>
      {image ? (
        <ImageBackground
          resizeMethod="resize"
          imageStyle={{resizeMode: 'cover', objectFit: 'cover'}}
          source={{
            uri: 'file://' + image.path,
            height: image.height,
            width: image.width,
          }}
          style={{width: '100%', height: '100%'}}
        />
      ) : (
        <Camera
          zoom={1}
          frameProcessor={isRecording ? frameProcessor : undefined}
          orientation="portrait"
          ref={innerRef}
          style={StyleSheet.absoluteFill}
          device={device!}
          isActive={true}
          photo={true}
          pixelFormat={Platform.OS === 'ios' ? 'native' : 'yuv'}
        />
      )}
      <CameraOverlay>{children}</CameraOverlay>
    </View>
  );
};

export default CameraWidget;
