import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { FingerKeys } from "../utils/state.types";
import { useEffect, useState } from "react";
import { buttonStyle, textStyle } from "../utils/styles";
import { capitilize } from "../utils";
import { Touchable } from "react-native";

type Params = {
  innerKey: FingerKeys;
  func: ({ key, value }: { key: FingerKeys; value: string }) => boolean;
};

const NameTile = ({ innerKey, func }: Params) => {
  const [value, setValue] = useState<string>("180");

  const updateFunction = (value: string) => {
    if (!func({ key: innerKey, value })) {
      setValue("");
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "center",
        width: "100%",
      }}
    >
      <View
        style={{
          flex: 2,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text style={{ ...textStyle, width: "30%" }}>
          {capitilize(innerKey.toString())}
        </Text>
        <TextInput
          style={{
            ...textStyle,
          }}
          keyboardType="numeric"
          value={value}
          onChangeText={(value) => updateFunction}
        />
      </View>
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            ...buttonStyle,
            width: 50,
            height: 25,
          }}
          onPress={() => {
            updateFunction("180");
          }}
        >
          <Text style={textStyle}> {"MAX"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...buttonStyle,
            width: 50,
            height: 25,
          }}
        >
          <Text style={textStyle} onPress={() => updateFunction("0")}>
            {"MIN"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NameTile;
