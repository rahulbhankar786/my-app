import React from "react";
import { View } from "react-native";
import { SCREEN_HEIGHT } from "@myapp/utils/utils";

const Placeholder = () => 
  Array.from({ length: 5 }).map((_, index) => (
    <React.Fragment key={`placeholder-${index}`}>
      <View
        style={{
          height: SCREEN_HEIGHT * 0.25,
          backgroundColor: '#e0e0e0',
          borderRadius: 16,
          marginVertical: 10,
          alignSelf: 'center',
        }}
      />
    </React.Fragment>
  ))

export default Placeholder;