import CameraBox from "./components/CameraBox";
import Controls from "./components/Controls";
import Bluetooth from "./components/Bluetooth";
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
          <Route path="/controls" element={<Controls />} />
          <Route path="/" element={<Bluetooth />} />
        </Routes>
      </MemoryRouter>
    </StateComponent>
  );
}
