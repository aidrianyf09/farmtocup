import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export function ImageWithFallback({ src, alt, fallback, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const defaultFallback = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23FAF7F2"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%238B5E3C" font-family="serif" font-size="16"%3ECoffee%3C/text%3E%3C/svg%3E';

  return (
    <img
      src={error || !src ? (fallback || defaultFallback) : src}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
}
