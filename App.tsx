import {StyleSheet} from 'react-native';
import {StateComponent} from './src/utils/state';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {Paths} from './src/types/routes';
import BluetoothConnectView from './src/views/BluetoothConnectView';
import BluetoothOffView from './src/views/BluetoothOffView';
import ControlsView from './src/views/ControlsView';
import TestCamera from './src/views/TestCamera';

export default function App() {
  return (
    <StateComponent>
      <MemoryRouter>
        <Routes>
          <Route
            path={
              // Paths.CameraPage
              '/'
            }
            element={<TestCamera />}></Route>
          <Route
            path={Paths.BluetoothConnectionPage + 'ds'}
            element={<BluetoothConnectView />}
          />
          <Route path={Paths.BluetoothOffPage} element={<BluetoothOffView />} />

          <Route path={Paths.ControlsPage} element={<ControlsView />} />
          {/* <Route path={Paths.CameraPage} element={<CameraView />} /> */}
        </Routes>
      </MemoryRouter>
    </StateComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
