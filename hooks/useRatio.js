import { useState, useEffect, useContext } from "react";
import { StateContext } from "../utils/state";
import { divide } from "../utils";

const pickRatio = (ratios = []) => {
  return ratios.reduce((bestRatio, currentRatio) => {
    if (1 - divide(currentRatio) > 1 - divide(bestRatio)) {
      return currentRatio;
    }

    return bestRatio;
  }, "4:3");
};

export const useRatio = () => {
  const [ratio, setRatio] = useState("4:3");
  const { state } = useContext(StateContext);
  const configureRatios = async () => {
    if (Platform.OS === "android") {
      const ratios = await state.camera.getSupportedRatiosAsync();
      const best = pickRatio(ratios);
      setRatio(best);
      console.log("Selected ratio:", best, "Available ratios:", ratios);
    }
  };

  useEffect(() => {
    const { camera, allRatios } = state;

    if (camera && !allRatios) {
      configureRatios();
    }
  }, [state.camera]);

  return ratio;
};
