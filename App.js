import CameraBox from "./components/CameraBox";
import { StateComponent } from "./utils/state";

export default function App() {
  return (
    <StateComponent>
      <CameraBox />
    </StateComponent>
  );
}
