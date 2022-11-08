import { useEffect, useState } from "react";
import { Button } from "react-native";
import { useNavigate } from "react-router-dom";
const NavigateButton = ({ destination = "", display, style }) => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (click) {
      setClick(false);
      navigate(destination);
    }
  }, [click]);

  return (
    <Button
      title={display}
      style={style}
      onPress={() => {
        setClick(true);
      }}
    />
  );
};
export default NavigateButton;
