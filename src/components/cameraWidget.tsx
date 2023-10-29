import {
  Camera,
  PhotoFile,
  runAsync,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {Children} from '../types';
import {vmax, vmin} from '../utils/styles';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

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
  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    runAsync(frame, () => {
      'worklet';
      new Promise(resolve => setTimeout(resolve, 1000));
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
          frameProcessor={isRecording ? frameProcessor : undefined}
          orientation="portrait"
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
