import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function DrawingCanvas() {
  const [tGestureStart, setTGestureStart] = useState();
  const [tGestureMove, setTGestureMove] = useState();
  const [tGestureUpdate, setTGestureUpdate] = useState();
  const [tGestureEnd, setTGestureEnd] = useState();

  const pan = Gesture.Pan()
    .onStart((g) => {
      setTGestureStart(`${Math.round(g.x)}, ${Math.round(g.y)}`);
    })
    .onTouchesMove((g) => {
      setTGestureMove(
        `${Math.round(g.changedTouches[0].x)}, ${Math.round(
          g.changedTouches[0].y
        )}`
      );
    })
    .onUpdate((g) => {
      setTGestureUpdate(`${Math.round(g.x)}, ${Math.round(g.y)}`);
    })
    .onEnd((g) => {
      setTGestureEnd(`${Math.round(g.x)}, ${Math.round(g.y)}`);
    });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
          <Text
            style={{ color: "white", fontSize: 24 }}
          >{`Gesture started at:  ${tGestureStart}`}</Text>
          <Text
            style={{ color: "white", fontSize: 24 }}
          >{`Gesture moved to:  ${tGestureMove}`}</Text>
          <Text
            style={{ color: "white", fontSize: 24 }}
          >{`Gesture updated to:  ${tGestureUpdate}`}</Text>
          <Text
            style={{ color: "white", fontSize: 24 }}
          >{`Gesture ended at:  ${tGestureEnd}`}</Text>
        </SafeAreaView>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
