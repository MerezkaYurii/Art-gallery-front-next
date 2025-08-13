'use client';

import React from 'react';

export interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <p>{`Something went wrong. ${error.message} `}</p>
      <button
        onClick={reset}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Try again
      </button>
    </div>
  );
}
