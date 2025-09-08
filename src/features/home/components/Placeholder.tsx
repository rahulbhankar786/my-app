import React from "react";
import { View } from "react-native";
import { SCREEN_HEIGHT } from "@myapp/utils/utils";

const Placeholder = () => {
  return [1,2,3,4,5].map((_, index) => (
      <View
        key={`placeholder-${index}`}
        style={{
          height: SCREEN_HEIGHT * 0.25,
          width: '90%',
          backgroundColor: '#e0e0e0',
          borderRadius: 16,
          marginVertical: 10,
          alignSelf: 'center',
        }}
      />
  ))
}
  

export default Placeholder;