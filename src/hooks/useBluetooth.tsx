import {useContext, useEffect, useState} from 'react';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import {StateContext} from '../utils/state';
import {Paths} from '../types/routes';
import {Actions} from '../utils/state.types';
import useNavigator from './useNavigator';
import Constants from 'expo-constants';

const useBluetooth = (
  func?: () => Promise<any>,
): (() => Promise<void>) | (() => void) => {
  const {dispatch} = useContext(StateContext);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const {navigate} = useNavigator();

  const requestBluetooth = async () => {
    setIsRequesting(true);
    try {
      await RNBluetoothClassic.requestBluetoothEnabled();
    } catch (err) {
      console.error(err);
    }
    setIsRequesting(false);
  };

  RNBluetoothClassic.onBluetoothDisabled(() => {
    setIsEnabled(false);
    dispatch({type: Actions.setDevice});
    navigate(Paths.BluetoothOffPage);
  });

  RNBluetoothClassic.onBluetoothEnabled(() => {
    setIsEnabled(true);
    navigate(Paths.BluetoothConnectionPage);
  });

  const checkInitialState = async () => {
    const isEnabled = await RNBluetoothClassic.isBluetoothEnabled();
    setIsEnabled(isEnabled);
    if (isEnabled) {
      if (func) await func();
      return;
    }
    navigate(Paths.BluetoothOffPage);
  };

  useEffect(() => {
    checkInitialState();
    return () => {};
  }, []);

  return !isEnabled && !isRequesting ? requestBluetooth : () => {};
};

export default useBluetooth;
