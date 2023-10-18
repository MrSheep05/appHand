import {
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
  StatusBar,
  Dimensions,
} from 'react-native';

export const vmin = (percent: number) => {
  const {height, width} = Dimensions.get('window');
  return width > height ? (height * percent) / 100 : (width * percent) / 100;
};

export const vmax = (percent: number) => {
  const {height, width} = Dimensions.get('window');
  return height > width ? (height * percent) / 100 : (width * percent) / 100;
};
const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#1D7870',
    borderWidth: 2,
    borderRadius: 15,
    width: '70%',
    backgroundColor: '#363E47',
    height: '8%',
  },
  view: {
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    width: '100%',
    height: '100%',
    alignContent: 'stretch',
  },
  header: {
    display: 'flex',
    flex: 1,
  },
  body: {
    display: 'flex',
    flex: 7,
    backgroundColor: '#2D333B',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export const textStyle = styles.text;
export const viewStyle = styles.view;
export const headerStyle = styles.header;
export const bodyStyle = styles.body;
export const buttonStyle = styles.button;
