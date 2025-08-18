'use client';

import Image from 'next/image';
import React from 'react';

type ImageModalProps = {
  url: string;
  onClose: () => void;
};

export default function ImageModal({ url, onClose }: ImageModalProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        cursor: 'pointer',
      }}
    >
      <Image
        src={url}
        alt="Artwork"
        style={{
          maxWidth: '80%',
          maxHeight: '80%',
          boxShadow: '0 0 20px white',
        }}
      />
    </div>
  );
}
