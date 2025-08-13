'use client';

import React from 'react';

export interface GlobalError {
  error: Error;
}

export default function GlobalError({ error }: GlobalError) {
  return (
    <html>
      <body>
        <div>
          <p>Something globally went wrong!</p>
          <p>{error.message}</p>
        </div>
      </body>
    </html>
  );
}
