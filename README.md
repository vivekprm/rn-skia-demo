# Instructions
As per the documentation, react-native-skia recommended version for expo SDK version 50 is v0.1.221. We need to apply [this patch](https://github.com/Shopify/react-native-skia/files/14357144/%40shopify%2Breact-native-skia%2B0.1.221.patch) (using [patch-package](https://www.npmjs.com/package/patch-package)) mentioned in the [info section](https://shopify.github.io/react-native-skia/docs/getting-started/web/#expo) of the documentation.
However, in this project, we are using skia version 0.1.240. And below are the steps to make it work for all the environments.

To make react-native-skia work on web, you need to do the following:
- Add postinstall script to package.json. So that canvaskit.wasm is copied to public folder.
```
"postinstall": "npx setup-skia-web public"
```
- Update metro.config.js.
```js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname, {
    isCSSEnabled: true,
});

config.resolver.assetExts.push('wasm');
config.transformer.getTransformOptions = async () => ({
    transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
    },
});

module.exports = config;
```
- Update App.js so that it can render the component on Web when Skia is loaded.
```js
export default function App() {
  const [isSkiaLoaded, setIsSkiaLoaded] = useState(false);
  if (Platform.OS === 'web') {
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
```