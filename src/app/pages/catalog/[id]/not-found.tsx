'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function NotFound() {
  const router = useRouter();
  return (
    <div>
      <p>Could not found photo</p>
      <button
        onClick={() => router.back()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go back
      </button>
    </div>
  );
}
