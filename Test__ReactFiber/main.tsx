import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { StrictMode, type JSX } from 'react';

function Box(props: JSX.IntrinsicElements['mesh']) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

createRoot(document.body).render(
  <StrictMode>
    <Canvas camera={{ position: [3, 3, 3] }}>
      <ambientLight />
      <directionalLight position={[3, 3, 3]} />
      <Box position={[0, 0, 0]} />
      <OrbitControls />
    </Canvas>
  </StrictMode>
)
