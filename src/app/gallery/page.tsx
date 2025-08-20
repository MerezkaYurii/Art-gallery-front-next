'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Player from '../components/Player';
import { useRef, useState } from 'react';
import ImageModal from '../components/ImageModal';
import GalleryRoom from '../components/GalleryRoom';

export default function GalleryPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const controlsRef = useRef<any>(null);

  const handleCanvasClick = () => {
    if (controlsRef.current) {
      controlsRef.current.lock(); // <--- активирует pointer lock
    }
  };

  const handleClick = () => {
    if (!activeImage && controlsRef.current) {
      controlsRef.current.lock();
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }} onClick={handleClick}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 75 }}
        onClick={handleCanvasClick}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Physics gravity={[0, -9.81, 0]}>
          <GalleryRoom onSelectImage={setActiveImage} />
          <Player modalOpen={!!activeImage} controlsRef={controlsRef} />
        </Physics>
      </Canvas>

      {activeImage && (
        <ImageModal
          url={activeImage}
          onClose={() => {
            setActiveImage(null);
            if (controlsRef.current) controlsRef.current.lock();
          }}
        />
      )}
    </div>
  );
}
