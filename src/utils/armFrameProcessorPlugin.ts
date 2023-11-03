import {VisionCameraProxy, Frame} from 'react-native-vision-camera';

const plugin = VisionCameraProxy.initFrameProcessorPlugin('arm');

export function predictArmBend(frame: Frame, {address}: {address: string}) {
  'worklet';
  if (!plugin)
    throw new Error('Failed to load Frame Processor Plugin "predictArmBend"!');
  return plugin.call(frame, {address});
}
