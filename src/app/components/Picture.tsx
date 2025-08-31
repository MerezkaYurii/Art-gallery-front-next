'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import React, { Suspense, useState } from 'react';

export interface PlayerRef {
  lock: () => void;
  unlock: () => void;
}

type PictureProps = {
  url: string;
  position: [number, number, number];
  size: [number, number];
  rotation?: [number, number, number];
  onSelectImage: (url: string) => void;
  playerRef: React.RefObject<PlayerRef>;
};

function PictureInner({
  url,
  position,
  size,
  rotation = [0, 0, 0],
  onSelectImage,
  playerRef,
}: PictureProps) {
  const texture = useTexture(url);
  const [hovered, setHovered] = useState(false);

  const setCursor = (value: string) => {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.style.cursor = value;
  };

  return (
    <mesh
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onSelectImage(url);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setCursor('pointer');
        playerRef.current?.unlock?.();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        setCursor('auto');
        playerRef.current?.lock?.();
      }}
    >
      <planeGeometry args={size} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function Picture(props: PictureProps) {
  return (
    <Suspense fallback={null}>
      <PictureInner {...props} />
    </Suspense>
  );
}
