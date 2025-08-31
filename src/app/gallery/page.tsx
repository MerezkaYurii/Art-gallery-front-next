'use client';

import React, { useEffect, useRef } from 'react';

export default function FullscreenVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const video = videoRef.current;
  useEffect(() => {
    return () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, [video]);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        src="/gallery.mp4"
        autoPlay
        loop
        playsInline
        controls
        className="video"
      />
      <style jsx>{`
        .video-container {
          display: flex;
          justify-content: center; /* центрируем по горизонтали */
          align-items: center; /* центрируем по вертикали */
          min-height: 100vh; /* на весь экран */
          overflow-y: auto; /* если по высоте не влезает */
        }

        .video {
          width: 50vw; /* по умолчанию для ПК */
          height: auto;
        }

        /* для планшетов */
        @media (max-width: 1024px) {
          .video {
            width: 80vw;
          }
        }

        /* для телефонов */
        @media (max-width: 768px) {
          .video {
            width: 100vw;
          }
        }
      `}</style>
    </div>
  );
}
