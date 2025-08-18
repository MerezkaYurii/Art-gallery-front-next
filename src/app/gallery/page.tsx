'use client';

import { Canvas } from '@react-three/fiber';

import { Physics } from '@react-three/rapier';
import Player from '../components/Player';
import { useState } from 'react';
import ImageModal from '../components/ImageModal';
import GalleryRoom from '../components/GalleryRoom';

export default function GalleryPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Physics gravity={[0, -9.81, 0]}>
          <GalleryRoom onSelectImage={setActiveImage} />
          <Player />
        </Physics>
      </Canvas>

      {activeImage && (
        <ImageModal url={activeImage} onClose={() => setActiveImage(null)} />
      )}
    </div>
  );
}
