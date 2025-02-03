import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Text } from 'react-native';
import DrawingCanvas from "./DrawingCanvas";
import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";

export default function App() {
  if (Platform.OS === "web") {
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
