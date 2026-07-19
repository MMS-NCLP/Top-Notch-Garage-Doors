'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Gallery({
  images,
  columns = 3,
}: {
  images: { src: string; alt: string }[];
  columns?: 2 | 3 | 4;
}) {
  const colClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${colClass[columns]} gap-4`}>
      {images.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          whileHover={{ scale: 1.02 }}
          className="relative aspect-[4/3] rounded-lg overflow-hidden bg-brand-silver/20 gleam"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      ))}
    </div>
  );
}
