// import React from 'react';
// import { RigidBody } from '@react-three/rapier';
// import { Box } from '@react-three/drei';
// import Picture from './Picture';

// /* eslint-disable @typescript-eslint/no-explicit-any */
// function WallsAndFloor() {
//   return (
//     <>
//       {/* Пол */}
//       <mesh position={[0, 0, 0]}>
//         <boxGeometry args={[20, 0.1, 20]} />
//         <meshStandardMaterial color="#ddd" />
//       </mesh>

//       {/* Потолок */}
//       <mesh position={[0, 6, 0]}>
//         <boxGeometry args={[20, 0.1, 20]} />
//         <meshStandardMaterial color="white" />
//       </mesh>

//       {/* Передняя стена */}
//       <mesh position={[0, 2.5, 10]} rotation={[0, Math.PI, 0]}>
//         <boxGeometry args={[20, 5, 0.1]} />
//         <meshStandardMaterial color="#90ee90" />
//       </mesh>

//       {/* Задняя стена */}
//       <mesh position={[0, 2.5, -10]}>
//         <boxGeometry args={[20, 5, 0.1]} />
//         <meshStandardMaterial color="orange" />
//       </mesh>

//       {/* Левая стена */}
//       <mesh position={[-10, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
//         <boxGeometry args={[20, 5, 0.1]} />
//         <meshStandardMaterial color="yellow" />
//       </mesh>

//       {/* Правая стена */}
//       <mesh position={[10, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
//         <boxGeometry args={[20, 5, 0.1]} />
//         <meshStandardMaterial color="deeppink" />
//       </mesh>
//     </>
//   );
// }

// type PictureProps = {
//   url: string;
//   position: [number, number, number];
//   size: [number, number];
//   rotation?: [number, number, number];
// };

// type GalleryRoomProps = {
//   onSelectImage: (url: string) => void;
//   playerRef: React.RefObject<any>;
// };

// export default function GalleryRoom({
//   onSelectImage,
//   playerRef,
// }: GalleryRoomProps) {
//   const artworks: PictureProps[] = [];

//   const sizes: [number, number][] = [
//     [1.6, 2.3],
//     [1.5, 2],
//     [1.3, 2.2],
//     [1.4, 2.1],
//     [1.2, 1.6],
//   ];

//   const urls = [
//     '/gallery/blob(3).jpg',
//     '/gallery/blob(4).jpg',
//     '/gallery/blob(1).jpg',
//     '/gallery/blob(5).jpg',
//     '/gallery/blob(6).jpg',
//     '/gallery/blob(9).jpg',
//     '/gallery/blob(10).jpg',
//     '/gallery/blob(11).jpg',
//     '/gallery/blob(12).jpg',
//     '/gallery/blob(13).jpg',
//     '/gallery/blob(14).jpg',
//     '/gallery/blob(15).jpg',
//     '/gallery/blob(16).jpg',
//     '/gallery/blob(17).jpg',
//     '/gallery/blob(18).jpg',
//     '/gallery/blob(19).jpg',
//     '/gallery/blob(22).jpg',
//     '/gallery/blob(23).jpg',
//     '/gallery/blob(24).jpg',
//     '/gallery/blob(25).jpg',
//   ];

//   // Задняя стена
//   for (let i = 0; i < 5; i++) {
//     const size = sizes[i % sizes.length];
//     artworks.push({
//       url: urls[i],
//       position: [-6 + i * 3, 2.5, -9.5],
//       size,
//     });
//   }

//   // Передняя стена
//   for (let i = 0; i < 5; i++) {
//     const size = sizes[i % sizes.length];
//     artworks.push({
//       url: urls[i + 5],
//       position: [-6 + i * 3, 2.5, 9.5],
//       size,
//     });
//   }

//   // Левая стена
//   for (let i = 0; i < 5; i++) {
//     const size = sizes[i % sizes.length];
//     artworks.push({
//       url: urls[i + 10],
//       position: [-9.5, 2.5, -6 + i * 3],
//       size,
//       rotation: [0, -Math.PI / 2, 0],
//     });
//   }

//   // Правая стена
//   for (let i = 0; i < 5; i++) {
//     const size = sizes[i % sizes.length];
//     const index = i + 15;
//     if (index < urls.length) {
//       artworks.push({
//         url: urls[index],
//         position: [9.5, 2.5, -6 + i * 3],
//         size,
//         rotation: [0, Math.PI / 2, 0],
//       });
//     }
//   }

//   return (
//     <>
//       <WallsAndFloor />
//       {artworks.map((art, index) => (
//         <Picture
//           key={index}
//           url={art.url}
//           position={art.position}
//           size={art.size}
//           rotation={art.rotation}
//           onSelectImage={onSelectImage}
//           playerRef={playerRef}
//         />
//       ))}
//     </>
//   );
// }
'use client';
// /* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useRef } from 'react';
import { Physics } from '@react-three/rapier';
import { Box } from '@react-three/drei';
import Picture from './Picture';

const wallPositions = {
  front: { x: 0, y: 2.5, z: 9.8 },
  back: { x: 0, y: 2.5, z: -9.8 },
  left: { x: -9.8, y: 2.5, z: 0 },
  right: { x: 9.8, y: 2.5, z: 0 },
};

const sizes: [number, number][] = [
  [1.6, 2.3],
  [1.5, 2],
  [1.3, 2.2],
  [1.4, 2.1],
  [1.2, 1.6],
];

const urls = Array.from(
  { length: 20 },
  (_, i) => `/gallery/blob(${i + 1}).jpg`,
);

export default function GalleryRoom({
  onSelectImage,
  playerRef,
}: {
  onSelectImage: (url: string) => void;
  playerRef: any;
}) {
  const artworks = useRef<any[]>([]);

  // Генерируем позиции картин на каждой стене
  urls.forEach((url, i) => {
    const size = sizes[i % sizes.length];
    let pos = [0, 2.5, 0] as [number, number, number];
    let rotation: [number, number, number] = [0, 0, 0];

    if (i < 5) {
      pos = [-6 + i * 3, 2.5, wallPositions.back.z];
    } else if (i < 10) {
      pos = [-6 + (i - 5) * 3, 2.5, wallPositions.front.z];
    } else if (i < 15) {
      pos = [wallPositions.left.x, 2.5, -6 + (i - 10) * 3];
      rotation = [0, -Math.PI / 2, 0];
    } else {
      pos = [wallPositions.right.x, 2.5, -6 + (i - 15) * 3];
      rotation = [0, Math.PI / 2, 0];
    }

    artworks.current.push({ url, size, pos, rotation });
  });

  return (
    <Physics gravity={[0, -9.81, 0]}>
      {/* Пол и стены */}
      <Box args={[20, 0.1, 20]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ddd" />
      </Box>
      <Box args={[20, 0.1, 20]} position={[0, 6, 0]}>
        <meshStandardMaterial color="white" />
      </Box>
      {/* Картины */}
      {artworks.current.map((art, idx) => (
        <Picture
          key={idx}
          url={art.url}
          position={art.pos}
          size={art.size}
          rotation={art.rotation}
          onSelectImage={onSelectImage}
          playerRef={playerRef}
        />
      ))}
    </Physics>
  );
}
