import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import {
  LoadSkiaWeb,
  WithSkiaWeb,
} from "@shopify/react-native-skia/lib/module/web";
import DrawingCanvas from "./DrawingCanvas";

export default function App() {
  if (Platform.OS === "web") {
    global._WORKLET = false;
    // @ts-expect-error
    global._log = console.log;
    // @ts-expect-error
    global._getAnimationTimestamp = () => performance.now();
    return <WithSkiaWeb getComponent={() => import("./DrawingCanvas")} />;
  }
  return (
    <View style={styles.container}>
      <DrawingCanvas />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
