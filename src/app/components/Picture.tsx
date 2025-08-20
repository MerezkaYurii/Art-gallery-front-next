// 'use client';

// import { useTexture } from '@react-three/drei';
// import * as THREE from 'three';
// import { useRef } from 'react';

// type PictureProps = {
//   url: string;
//   position: [number, number, number];
//   size: [number, number];
//   rotation?: [number, number, number];
//   onSelectImage: (url: string) => void;
// };

// export default function Picture({
//   url,
//   position,
//   size,
//   rotation = [0, 0, 0],
//   onSelectImage,
// }: PictureProps) {
//   const meshRef = useRef<THREE.Mesh>(null!);
//   const texture = useTexture(url);

//   // Обработка клика
//   const handleClick = () => {
//     onSelectImage(url);
//   };

//   return (
//     <mesh
//       ref={meshRef}
//       position={position}
//       rotation={rotation}
//       onClick={handleClick}
//     >
//       <planeGeometry args={size} />
//       <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
//     </mesh>
//   );
// }

'use client';

import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, Suspense } from 'react';

type PictureProps = {
  url: string;
  position: [number, number, number];
  size: [number, number];
  rotation?: [number, number, number];
  onSelectImage: (url: string) => void;
};

function PictureInner({
  url,
  position,
  size,
  rotation = [0, 0, 0],
  onSelectImage,
}: PictureProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture(url);

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onClick={() => onSelectImage(url)}
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
