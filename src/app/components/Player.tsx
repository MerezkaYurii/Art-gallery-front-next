'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
} from 'react';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';

type MovementKeys = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

const mapKey = (key: string): keyof MovementKeys | '' => {
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

export type PlayerRef = {
  lock: () => void;
  unlock: () => void;
  getObject: () => THREE.Object3D | undefined;
};

// type PlayerProps = {
//   modalOpen: boolean;
// };

const Player = forwardRef<PlayerRef, { modalOpen: boolean }>(
  ({ modalOpen }, ref) => {
    const bodyRef = useRef<any>(null);
    const controlsRef = useRef<any>(null);
    const { camera } = useThree();
    const speed = 4;

    const [keys, setKeys] = useState<MovementKeys>({
      forward: false,
      backward: false,
      left: false,
      right: false,
    });

    useImperativeHandle(ref, () => ({
      lock: () => controlsRef.current?.lock?.(),
      unlock: () => controlsRef.current?.unlock?.(),
      getObject: () => controlsRef.current?.getObject?.(),
    }));

    // Слушаем нажатия клавиш
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        const mapped = mapKey(e.key);
        if (mapped) setKeys((k) => ({ ...k, [mapped]: true }));
      };
      const handleKeyUp = (e: KeyboardEvent) => {
        const mapped = mapKey(e.key);
        if (mapped) setKeys((k) => ({ ...k, [mapped]: false }));
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }, []);

    useFrame(() => {
      if (modalOpen) return;

      const body = bodyRef.current;
      const controls = controlsRef.current;
      if (!body || !controls) return;

      const camObject = controls.getObject();
      if (!camObject) return;

      // Получаем yaw (вращение вокруг Y)
      const euler = new THREE.Euler().setFromQuaternion(
        camObject.quaternion,
        'YXZ',
      );
      const yaw = euler.y;

      // Обнуляем pitch и roll — оставляем только yaw
      camObject.quaternion.setFromEuler(new THREE.Euler(0, yaw, 0, 'YXZ'));

      // Вычисляем направление движения
      const velocity = new THREE.Vector3();
      if (keys.forward) velocity.z -= 1;
      if (keys.backward) velocity.z += 1;
      // if (keys.left) velocity.x -= 1;
      // if (keys.right) velocity.x += 1;

      velocity.normalize().multiplyScalar(speed);

      const direction = velocity.applyQuaternion(camera.quaternion);
      body.setLinvel({ x: direction.x, y: 0, z: direction.z }, true);

      const rotationSpeed = 0.03;
      if (keys.left) {
        camObject.rotation.y += rotationSpeed;
      }
      if (keys.right) {
        camObject.rotation.y -= rotationSpeed;
      }

      // Обновляем позицию камеры над телом
      const pos = body.translation();
      camera.position.set(pos.x, 1.7, pos.z);
    });

    return (
      <>
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
  },
);

Player.displayName = 'Player';

export default Player;
