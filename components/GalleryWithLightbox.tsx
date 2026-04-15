'use client';

import { useState } from 'react';
import LazyImage from './LazyImage';
import Lightbox from './Lightbox';

interface GalleryImage {
  src: string;
  alt?: string;
}

interface Props {
  images: GalleryImage[];
  /** Tailwind grid classes (np. "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3") */
  gridClassName?: string;
  /** Aspect ratio class na pojedynczy thumbnail (np. "aspect-square") */
  itemClassName?: string;
}

// Client wrapper: gallery thumbnails + lightbox state. Imported by GenericGallery
// (Server Component) - server pre-renders thumbnails, client adds onClick + modal
// after hydration. Zero JS cost on first paint, lightbox JS lazy-loaded with the
// rest of GenericSection chunk.
export default function GalleryWithLightbox({
  images,
  gridClassName = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3',
  itemClassName = 'w-full aspect-square rounded-lg',
}: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className={gridClassName}>
        {images.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            type="button"
            onClick={() => setOpenIdx(i)}
            aria-label={`Powieksz zdjecie ${i + 1}`}
            className="block w-full p-0 border-0 bg-transparent cursor-zoom-in"
          >
            <LazyImage
              src={img.src}
              alt={img.alt ?? ''}
              wrapperClassName={itemClassName}
              className="object-cover transition-transform duration-300 hover:scale-105"
              fill
            />
          </button>
        ))}
      </div>

      {openIdx != null && (
        <Lightbox
          images={images}
          initialIndex={openIdx}
          onClose={() => setOpenIdx(null)}
        />
      )}
    </>
  );
}
