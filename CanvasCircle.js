import { Canvas, Circle } from '@shopify/react-native-skia';
import React from 'react'
import { Pressable, Text, View } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";

const CanvasCircle = () => {
  const radius = useSharedValue(50);

  const expandCircle = () => {
    radius.value = withSpring(radius.value === 50 ? 100 : 50, {
      damping: 10,
      stiffness: 100,
    });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Canvas style={{ width: 200, height: 200 }}>
        <Circle cx={100} cy={100} r={radius} color="blue" />
      </Canvas>
      <Pressable
        onPress={expandCircle}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "black",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>Expand / Shrink</Text>
      </Pressable>
    </View>
  );
};

export default CanvasCircle;