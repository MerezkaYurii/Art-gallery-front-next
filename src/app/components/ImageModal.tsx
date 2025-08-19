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
      <Image
        src={url}
        alt="Artwork"
        width={600}
        height={0}
        style={{
          objectFit: 'cover',
          height: 'auto',

          boxShadow: '0 0 20px white',
        }}
      />
    </div>
  );
}
