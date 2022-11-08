import Device from "./Device";
import { Button, View } from "react-native";
import { useEffect, useState, useContext } from "react";
import { BleManager } from "react-native-ble-plx";
import { StateContext } from "../utils/state";

const manager = new BleManager();

const Bluetooth = () => {
  const [devices, setDevices] = useState([]);
  const { dispatch } = useContext(StateContext);

  const scan = async () => {
    setDevices([]);
    const startTime = new Date();
    const subscription = manager.onStateChange((state) => {
      if (state === "PoweredOn") {
        manager.startDeviceScan(
          null,
          { allowDuplicates: false },
          (error, device) => {
            if (!error) {
              const endTime = new Date();
              if (device != null) {
                console.log(device.id, device.name, device.localName);
              }
              if ((endTime - startTime) / 1000 > 5) {
                manager.stopDeviceScan();
                console.log(devices);
              }
            }
          }
        );
      }
    }, true);
  };

  useEffect(() => {
    dispatch({ type: "bleManager", payload: manager });
    scan();
  }, []);

  return (
    <View>
      <Button title={"Rescan"} onPress={scan}></Button>
      {devices.map(({ id, name }) => {
        return <Device id={id} name={"a" + name} />;
      })}
    </View>
  );
};

export default Bluetooth;
