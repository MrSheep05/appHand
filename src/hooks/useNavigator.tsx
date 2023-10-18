import { useLocation, useNavigate } from "react-router-dom";
import { Paths } from "../types/routes";

type Output = {
  navigate: (path: Paths) => void;
  currentPath: Paths;
};
const useNavigator = (): Output => {
  const navigateFunc = useNavigate();
  const localization = useLocation();

  const navigate = (path: Paths) => {
    if (localization.pathname != path) {
      navigateFunc(path);
    }
  };

  return { currentPath: localization.pathname as Paths, navigate };
};

export default useNavigator;
