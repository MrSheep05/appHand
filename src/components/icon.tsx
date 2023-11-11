import {ColorValue} from 'react-native';
import CameraEnhance from './res/camera-enhance.svg';
import CameraEnhanceOutline from './res/camera-enhance-outline.svg';
import CameraOutline from './res/camera-outline.svg';
import Controller from './res/controller-classic.svg';
import ControllerOutline from './res/controller-classic-outline.svg';

const Icon = ({
  icon,
  size,
  color,
}: {
  icon: Icons;
  size: number;
  color: ColorValue;
}) => {
  switch (icon) {
    case Icons.CameraEnhance:
      return (
        <CameraEnhance
          color={color}
          style={{width: size, height: size}}
          fill={color}
        />
      );
    case Icons.CameraEnhanceOutline:
      return (
        <CameraEnhanceOutline
          color={color}
          style={{width: size, height: size}}
          fill={color}
        />
      );
    case Icons.CameraOutline:
      return (
        <CameraOutline
          color={color}
          style={{width: size, height: size}}
          fill={color}
        />
      );
    case Icons.Controller:
      return (
        <Controller
          color={color}
          style={{width: size, height: size}}
          fill={color}
        />
      );
    case Icons.ControllerOutline:
      return (
        <ControllerOutline
          color={color}
          style={{width: size, height: size}}
          fill={color}
        />
      );
  }
};

export enum Icons {
  CameraEnhance,
  CameraEnhanceOutline,
  CameraOutline,
  Controller,
  ControllerOutline,
}

export default Icon;
