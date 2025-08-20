import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { Box } from '@react-three/drei';
import Picture from './Picture';

function WallsAndFloor() {
  return (
    <>
      {/* Пол (светло-серый) */}
      <RigidBody type="fixed" colliders="cuboid">
        <Box args={[20, 0.1, 20]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#ddd" />
        </Box>
      </RigidBody>

      {/* Потолок (белый) */}
      <RigidBody type="fixed" colliders="cuboid">
        <Box args={[20, 0.1, 20]} position={[0, 6, 0]}>
          <meshStandardMaterial color="white" />
        </Box>
      </RigidBody>

      {/* Передняя стена (оранжевая) */}
      <RigidBody type="fixed" colliders="cuboid">
        <Box
          args={[20, 5, 0.1]}
          rotation={[0, Math.PI, 0]}
          position={[0, 2.5, 10]}
        >
          <meshStandardMaterial color="#90ee90" />
        </Box>
      </RigidBody>

      {/* Задняя стена (розовая) */}
      <RigidBody type="fixed" colliders="cuboid">
        <Box args={[20, 5, 0.1]} rotation={[0, 0, 0]} position={[0, 2.5, -10]}>
          <meshStandardMaterial color="orange" />
        </Box>
      </RigidBody>

      {/* Левая стена (желтая) */}
      <RigidBody type="fixed" colliders="cuboid">
        <Box
          args={[20, 5, 0.1]}
          rotation={[0, Math.PI / 2, 0]}
          position={[-10, 2.5, 0]}
        >
          <meshStandardMaterial color="yellow" />
        </Box>
      </RigidBody>

      {/* Правая стена (малиновая) */}

      <RigidBody type="fixed" colliders="cuboid">
        <Box
          args={[20, 5, 0.1]}
          rotation={[0, -Math.PI / 2, 0]}
          position={[10, 2.5, 0]}
        >
          <meshStandardMaterial color="deeppink" />
        </Box>
      </RigidBody>
    </>
  );
}

type PictureProps = {
  url: string;
  position: [number, number, number];
  size: [number, number];
  rotation?: [number, number, number];
};

type GalleryRoomProps = {
  onSelectImage: (url: string) => void;
};

export default function GalleryRoom({ onSelectImage }: GalleryRoomProps) {
  const artworks: PictureProps[] = [];

  const sizes: [number, number][] = [
    [1.6, 2.3],
    [1.5, 2],
    [1.3, 2.2],
    [1.4, 2.1],
    [1.2, 1.6],
  ];

  const urls = [
    '/gallery/blob(3).jpg',
    '/gallery/blob(4).jpg',
    '/gallery/blob(1).jpg',
    '/gallery/blob(5).jpg',
    '/gallery/blob(6).jpg',
    '/gallery/blob(9).jpg',
    '/gallery/blob(10).jpg',
    '/gallery/blob(11).jpg',
    '/gallery/blob(12).jpg',
    '/gallery/blob(13).jpg',
    '/gallery/blob(14).jpg',
    '/gallery/blob(15).jpg',
    '/gallery/blob(16).jpg',
    '/gallery/blob(17).jpg',
    '/gallery/blob(18).jpg',
    '/gallery/blob(19).jpg',
    '/gallery/blob(22).jpg',
    '/gallery/blob(23).jpg',
    '/gallery/blob(24).jpg',
    '/gallery/blob(25).jpg',
  ];

  // Задняя стена
  for (let i = 0; i < 5; i++) {
    const size = sizes[i % sizes.length];
    artworks.push({
      url: urls[i],
      position: [-6 + i * 3, 2.5, -9.9],
      size,
    });
  }

  // Передняя стена
  for (let i = 0; i < 5; i++) {
    const size = sizes[i % sizes.length];
    artworks.push({
      url: urls[i + 5],
      position: [-6 + i * 3, 2.5, 9.9],
      size,
    });
  }

  // Левая стена
  for (let i = 0; i < 5; i++) {
    const size = sizes[i % sizes.length];
    artworks.push({
      url: urls[i + 10],
      position: [-9.9, 2.5, -6 + i * 3],
      size,
      rotation: [0, -Math.PI / 2, 0],
    });
  }

  // Правая стена
  for (let i = 0; i < 5; i++) {
    const size = sizes[i % sizes.length];
    artworks.push({
      url: urls[i + 15],
      position: [9.9, 2.5, -6 + i * 3],
      size,
      rotation: [0, Math.PI / 2, 0],
    });
  }

  return (
    <>
      <WallsAndFloor />
      {artworks.map((art, index) => (
        <Picture
          key={index}
          url={art.url}
          position={art.position}
          size={art.size}
          rotation={art.rotation}
          onSelectImage={onSelectImage}
        />
      ))}
    </>
  );
}
