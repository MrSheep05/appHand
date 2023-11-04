import {useContext} from 'react';
import {StateContext} from '../utils/state';
import {sendPicture} from '../utils/httpService';
import {Actions} from '../utils/state.types';

interface Params {
  imageUrl: string;
  name?: string;
}
type usePredictOutput = {
  sendData: (data: Params, func: (status: number) => void) => Promise<void>;
};
const usePredictBend = (): usePredictOutput => {
  const {dispatch} = useContext(StateContext);

  const predictBend = async (
    imageUrl: string,
    name?: string,
  ): Promise<number> => {
    const {status, positions} = await sendPicture(imageUrl, name);

    if (status === 200) {
      if (positions) {
        dispatch({
          type: Actions.setPosition,
          payload: positions,
        });
      }
    }
    return status;
  };

  const sendData = async (data: Params, func: (status: number) => void) => {
    const status = await predictBend(data.imageUrl, data.name);
    func(status);
  };

  return {sendData};
};

export default usePredictBend;
