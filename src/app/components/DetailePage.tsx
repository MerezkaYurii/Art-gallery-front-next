'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import ExternalFacebookVideo from './ExternalFacebookVideo';

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  type: 'photo' | 'video';
  category: string;
};

type DetailPageProps = {
  item: GalleryItem;
};

function extractYouTubeID(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([0-9A-Za-z_-]{11})/,
  );
  return match ? match[1] : null;
}

export default function DetailPage({ item }: DetailPageProps) {
  const router = useRouter();

  const handleBackdropClick = () => {
    router.back();
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const isYouTube =
    item.thumbnail.includes('youtube.com') ||
    item.thumbnail.includes('youtu.be');
  const isFacebook = item.thumbnail.includes('facebook.com');
  const isDirectVideo =
    item.thumbnail.endsWith('.mp4') ||
    item.thumbnail.includes('cloudinary.com');

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-black/70"
      onClick={handleBackdropClick}
    >
      <div
        className="max-w-4xl mx-auto px-6 py-12 text-center"
        onClick={stopPropagation}
      >
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-700 bg-gray-900">
          {item.type === 'photo' ? (
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          ) : isDirectVideo ? (
            <video
              controls
              className="w-full max-h-[600px] object-cover"
              autoPlay
              muted
              loop
            >
              <source
                src={item.thumbnail.replace('/upload/so_1/', '/upload/')}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : isYouTube ? (
            <iframe
              src={`https://www.youtube.com/embed/${extractYouTubeID(item.thumbnail)}`}
              className="w-full aspect-video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : isFacebook ? (
            <ExternalFacebookVideo url={item.thumbnail} />
          ) : (
            <div className="text-white p-6">Unknown video format</div>
          )}

          <div className="p-6">
            <h1 className="text-3xl text-white font-bold mb-4">{item.title}</h1>
            <p className="text-gray-300 text-lg">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
