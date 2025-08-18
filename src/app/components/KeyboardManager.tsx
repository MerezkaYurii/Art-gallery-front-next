// src/app/components/KeyboardManager.tsx

'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    keyState: Record<string, boolean>;
  }
}

export default function KeyboardManager() {
  useEffect(() => {
    const keys: Record<string, boolean> = {};
    window.keyState = keys;

    const down = (e: KeyboardEvent) => (keys[e.key.toLowerCase()] = true);
    const up = (e: KeyboardEvent) => (keys[e.key.toLowerCase()] = false);

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);

    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  return null;
}
