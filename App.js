import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import {
  LoadSkiaWeb,
  WithSkiaWeb,
} from "@shopify/react-native-skia/lib/module/web";
import SketchCanvasWithInteraction from "./SketchCanvasWithInteraction";

export default function App() {
  const [isSkiaLoaded, setIsSkiaLoaded] = useState(false);
  if (Platform.OS === "web") {
    LoadSkiaWeb({ locatefile: () => "/canvaskit.wasm" }).then(() => {
      setIsSkiaLoaded(true);
    });
    if (isSkiaLoaded) {
      return (
        <WithSkiaWeb
          getComponent={() => import("./SketchCanvasWithInteraction")}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Loading Skia...</Text>
        </View>
      );
    }
  }
  return (
    <View style={styles.container}>
      <SketchCanvasWithInteraction />
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
