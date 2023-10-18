import {Camera, PhotoFile, useCameraDevice} from 'react-native-vision-camera';
import {Children} from '../types';
import {useState} from 'react';
import {vmin} from '../utils/styles';
import {divideRatio} from '../utils/cameraHelpers';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';

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
        height: '100%',
        width: '100%',
      }}>
      <View style={{width: '100%', height: '100%', padding: 20}}>
        {children}
      </View>
    </View>
  );
};

const CameraWidget = ({
  children,
  innerRef,
  image,
}: {
  children?: Children;
  innerRef: React.RefObject<Camera>;
  image?: PhotoFile;
}) => {
  const device = useCameraDevice('back', {
    physicalDevices: ['ultra-wide-angle-camera'],
  });
  return (
    <View style={{width: '100%', height: '100%'}}>
      {image ? (
        <Image
          source={{uri: 'file://' + image.path}}
          style={{width: '100%', height: '100%'}}
        />
      ) : (
        <Camera
          ref={innerRef}
          style={StyleSheet.absoluteFill}
          device={device!}
          isActive={true}
          photo={true}
        />
      )}
      <CameraOverlay>{children}</CameraOverlay>
    </View>
  );
};

export default CameraWidget;
