import CameraBox from "./components/CameraBox";
import Bluetooth from "./components/Bluetooth";
import Controls from "./components/Controls";
import { StateComponent } from "./utils/state";
import { LogBox } from "react-native";
import { MemoryRouter, Routes, Route } from "react-router-dom";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <StateComponent>
      <MemoryRouter>
        <Routes>
          <Route path="/camera" element={<CameraBox />} />
          <Route path="/ble" element={<Bluetooth />} />
          <Route path="/" element={<Controls />} />
        </Routes>
      </MemoryRouter>
    </StateComponent>
  );
}
