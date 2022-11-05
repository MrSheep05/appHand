import CameraBox from "./components/CameraBox";
import { StateComponent } from "./utils/state";
import { BleManager } from "react-native-ble-plx";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]);
const manager = new BleManager();
export default function App() {
  return (
    <StateComponent>
      <CameraBox />
    </StateComponent>
  );
}
