'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Filter, ExternalLink } from 'lucide-react';
import { CURATED_VIDEOS, VIDEO_CATEGORIES, type VideoCategory, type Video } from '@/lib/video-library';

function VideoCard({ video, isSelected, onSelect }: { video: Video; isSelected: boolean; onSelect: () => void }) {
  const difficultyConfig = {
    homeowner: { label: 'Homeowner', color: '#059669' },
    intermediate: { label: 'Intermediate', color: '#d97706' },
    professional: { label: 'Professional', color: '#dc2626' },
  };
  const diff = difficultyConfig[video.difficulty];

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-lg border-2 transition-all duration-200 overflow-hidden ${
        isSelected
          ? 'border-brand-blue shadow-md'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Thumbnail area */}
      <div className="relative aspect-video bg-gray-900 flex items-center justify-center group">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-brand-red/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
          </div>
        </div>
        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-[10px] font-mono rounded">
          {video.duration}
        </span>
      </div>
      {/* Info */}
      <div className="p-3">
        <h4 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">{video.title}</h4>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{video.brand}</span>
          <span
            className="text-[10px] font-medium px-1.5 py-0.5 rounded"
            style={{ backgroundColor: `${diff.color}15`, color: diff.color }}
          >
            {diff.label}
          </span>
        </div>
      </div>
    </button>
  );
}

export default function VideoLibrary() {
  const [activeCategory, setActiveCategory] = useState<VideoCategory | 'all'>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return CURATED_VIDEOS;
    return CURATED_VIDEOS.filter(v => v.category === activeCategory);
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: CURATED_VIDEOS.length };
    for (const v of CURATED_VIDEOS) {
      counts[v.category] = (counts[v.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <section id="video-library" className="scroll-mt-24">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl md:text-4xl text-brand-blue mb-3">
          Curated Video Library
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hand-picked videos from Clopay, LiftMaster, Chamberlain, Amarr, and industry experts.
          Each video includes TNGD editorial notes explaining how it applies to your system.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter tabs — vertical on desktop */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="flex items-center gap-2 mb-3 lg:mb-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</span>
          </div>
          <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            <button
              onClick={() => { setActiveCategory('all'); setSelectedVideo(null); }}
              className={`whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-brand-blue text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Videos ({categoryCounts.all})
            </button>
            {(Object.keys(VIDEO_CATEGORIES) as VideoCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setSelectedVideo(null); }}
                className={`whitespace-nowrap px-3 py-2 rounded-md text-sm text-left transition-colors ${
                  activeCategory === cat
                    ? 'bg-brand-blue text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {VIDEO_CATEGORIES[cat].label} ({categoryCounts[cat] || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 min-w-0">
          {/* Selected video player */}
          <AnimatePresence mode="wait">
            {selectedVideo && (
              <motion.div
                key={selectedVideo.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6"
              >
                <div className="bg-black rounded-xl overflow-hidden shadow-lg">
                  <div className="relative w-full aspect-video">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                      title={selectedVideo.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg text-gray-900">{selectedVideo.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{selectedVideo.brand} · {selectedVideo.duration}</p>
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
                    >
                      YouTube <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{selectedVideo.description}</p>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs font-medium text-brand-blue mb-1">TNGD Editorial Note</p>
                    <p className="text-sm text-gray-700">{selectedVideo.tngdNote}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Video grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filtered.map(video => (
              <VideoCard
                key={video.id}
                video={video}
                isSelected={selectedVideo?.id === video.id}
                onSelect={() => setSelectedVideo(video)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>No videos in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
