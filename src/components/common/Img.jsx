import { useState } from 'react';

/**
 * Responsive image with srcset, lazy loading, intrinsic size (prevents layout shift)
 * and a soft fade-in once decoded.
 */
export default function Img({ image, alt, sizes = '100vw', priority = false, className = '', ...rest }) {
  const [loaded, setLoaded] = useState(false);
  if (!image) return null;
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={`img ${loaded ? 'is-loaded' : ''} ${className}`}
      onLoad={() => setLoaded(true)}
      ref={(el) => {
        // Cached images can finish loading before React attaches onLoad.
        if (el && el.complete && el.naturalWidth && !loaded) setLoaded(true);
      }}
      {...rest}
    />
  );
}
