'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const mapKey = (key: string) => {
  switch (key.toLowerCase()) {
    case 'w':
      return 'forward';
    case 's':
      return 'backward';
    case 'a':
      return 'left';
    case 'd':
      return 'right';
    default:
      return '';
  }
};

type PlayerProps = {
  modalOpen: boolean;
  controlsRef: React.MutableRefObject<any>;
};

export default function Player({ modalOpen, controlsRef }: PlayerProps) {
  const bodyRef = useRef<any>(null);
  const { camera } = useThree();
  const speed = 5;

  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // Обработка клавиш
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mapped = mapKey(e.key);
      if (mapped) {
        setKeys((prev) => ({ ...prev, [mapped]: true }));
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const mapped = mapKey(e.key);
      if (mapped) {
        setKeys((prev) => ({ ...prev, [mapped]: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const body = bodyRef.current;
    const controls = controlsRef.current;
    if (!body || !controls || modalOpen) return;

    const cam = controls.getObject();
    cam.rotation.x = 0;
    cam.rotation.z = 0;

    // Движение
    const velocity = new THREE.Vector3();

    if (keys.forward) velocity.z -= 1;
    if (keys.backward) velocity.z += 1;
    if (keys.left) velocity.x -= 1;
    if (keys.right) velocity.x += 1;

    velocity.normalize().multiplyScalar(speed);

    const direction = velocity.applyQuaternion(camera.quaternion);
    body.setLinvel({ x: direction.x, y: 0, z: direction.z }, true);

    // Позиция камеры
    const pos = body.translation();
    camera.position.set(pos.x, 1.7, pos.z); // поднята камера чуть выше тела
  });

  return (
    <>
      {/* ВАЖНО: используем ref из пропсов */}
      <PointerLockControls ref={controlsRef} enabled={!modalOpen} />
      <RigidBody
        ref={bodyRef}
        colliders={false}
        mass={1}
        type="dynamic"
        position={[0, 1.7, 0]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[0.5, 1]} />
      </RigidBody>
    </>
  );
}
