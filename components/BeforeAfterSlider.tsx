'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function BeforeAfterSlider({
  before,
  after,
  beforeAlt = 'Before',
  afterAlt = 'After',
}: {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMove(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-lg overflow-hidden cursor-col-resize select-none gleam"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      <Image src={after} alt={afterAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <Image src={before} alt={beforeAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4M8 15l4 4 4-4" />
          </svg>
        </div>
      </div>
      <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/50 text-white text-xs rounded">Before</span>
      <span className="absolute top-3 right-3 px-2 py-0.5 bg-black/50 text-white text-xs rounded">After</span>
    </div>
  );
}
