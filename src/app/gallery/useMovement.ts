import { useEffect, useState } from 'react';

export function useMovement() {
  const [keysPressed, setKeysPressed] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          setKeysPressed((prev) => ({ ...prev, forward: true }));
          break;
        case 'KeyS':
          setKeysPressed((prev) => ({ ...prev, backward: true }));
          break;
        case 'KeyA':
          setKeysPressed((prev) => ({ ...prev, left: true }));
          break;
        case 'KeyD':
          setKeysPressed((prev) => ({ ...prev, right: true }));
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          setKeysPressed((prev) => ({ ...prev, forward: false }));
          break;
        case 'KeyS':
          setKeysPressed((prev) => ({ ...prev, backward: false }));
          break;
        case 'KeyA':
          setKeysPressed((prev) => ({ ...prev, left: false }));
          break;
        case 'KeyD':
          setKeysPressed((prev) => ({ ...prev, right: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keysPressed;
}
