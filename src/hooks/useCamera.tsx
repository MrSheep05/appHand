import {useEffect, useState} from 'react';
import {useCameraPermission} from 'react-native-vision-camera';

const useCamera = (): boolean => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [permissions, setPermissions] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const permission = hasPermission
        ? hasPermission
        : await requestPermission();
      setPermissions(permission);
    })();
  }, []);
  return permissions;
};

export default useCamera;
