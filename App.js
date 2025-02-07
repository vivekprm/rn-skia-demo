import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Text } from 'react-native';
import CanvasCircle from './CanvasCircle';
import { useState } from 'react';
import { LoadSkiaWeb, WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";

export default function App() {
  const [isSkiaLoaded, setIsSkiaLoaded] = useState(false);
  if (Platform.OS === 'web') {
    global._WORKLET = false;
    global._log = console.log;
    global._getAnimationTimestamp = () => performance.now();
    LoadSkiaWeb({locatefile: () => '/canvaskit.wasm'})
    .then(() => {
      setIsSkiaLoaded(true);
    });
    if (isSkiaLoaded) {
      return (
      <WithSkiaWeb
        getComponent={() => import("./CanvasCircle")}
      />)
    } else {
      return (
        <View style={styles.container}>
          <Text>Loading Skia...</Text>
        </View>
      )
    }
  }
  return (
    <View style={styles.container}>
      <CanvasCircle />
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
