'use client';

import React from 'react';

export default function Auth({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full max-w-4xl bg-white rounded-lg shadow overflow-hidden">
      {children}
    </div>
  );
} 