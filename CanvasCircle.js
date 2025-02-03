import { Canvas, Circle } from '@shopify/react-native-skia';
import React from 'react'

const CanvasCircle = () => {
  return (
    <Canvas style={{ width: 200, height: 200 }}>
        <Circle cx={100} cy={100} r={50} color="blue" />
      </Canvas>
  )
}

export default CanvasCircle;