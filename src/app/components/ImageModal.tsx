'use client';

import Image from 'next/image';
import React, { useState } from 'react';

type ImageModalProps = {
  url: string;
  onClose: () => void;
};

export default function ImageModal({ url, onClose }: ImageModalProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 5,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        cursor: 'pointer',
        overflow: 'auto',
        padding: '2rem',
      }}
    >
      {!loaded && !error && (
        <div style={{ color: 'white', fontSize: '1.5rem' }}>Загрузка...</div>
      )}

      {!error ? (
        <Image
          src={url}
          alt="Artwork"
          width={800}
          height={1200}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            console.warn('Не удалось загрузить картинку:', url);
            setError(true);
          }}
          style={{
            height: 'auto',
            objectFit: 'contain',
            boxShadow: '0 0 20px white',
          }}
        />
      ) : (
        <div style={{ color: 'white', fontSize: '1.5rem' }}>
          ❌ Не удалось загрузить изображение
        </div>
      )}
    </div>
  );
}
