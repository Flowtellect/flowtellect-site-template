'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  fill?: boolean;
  priority?: boolean;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}

// Lazy-loaded <img> with blur-up + shimmer effect.
//   - priority: skip IntersectionObserver, load immediately (use for above-the-fold)
//   - fill: absolute-fill mode — wrapper must have sized parent
// Pairs with CSS in globals.css: .img-blur-up + .img-blur-up.loaded
export default function LazyImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  fill = false,
  priority = false,
  style,
  imgStyle,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || inView) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [priority, inView]);

  const wrapperClass = `img-blur-up ${loaded ? 'loaded' : ''} ${wrapperClassName}`.trim();

  const mergedImgStyle: React.CSSProperties = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...imgStyle }
    : { width: '100%', height: 'auto', ...imgStyle };

  return (
    <div ref={ref} className={wrapperClass} style={style}>
      {inView && (
        <img
          src={src}
          alt={alt || ''}
          className={className}
          style={mergedImgStyle}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setLoaded(true)}
          data-loading={loaded ? 'false' : 'true'}
        />
      )}
    </div>
  );
}
