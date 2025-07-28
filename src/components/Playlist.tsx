'use client';

import { motion } from 'framer-motion';
import { Heart, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  audioUrl: string;
  isLiked: boolean;
}

interface PlaylistProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onSongSelect: (song: Song) => void;
  onToggleLike: (songId: number) => void;
  onPlayPause: () => void;
}

export default function Playlist({
  songs,
  currentSong,
  isPlaying,
  onSongSelect,
  onToggleLike,
  onPlayPause
}: PlaylistProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-2">
      {songs.map((song, index) => (
        <motion.div
          key={song.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
            currentSong?.id === song.id
              ? 'bg-purple-600/30 border border-purple-400/50 shadow-lg'
              : 'bg-white/5 hover:bg-white/10'
          }`}
          onClick={() => onSongSelect(song)}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={song.cover}
                alt={song.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              {currentSong?.id === song.id && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-white" />
                  ) : (
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  )}
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate text-white">
                {song.title}
              </h3>
              <p className="text-sm text-gray-300 truncate">
                {song.artist} • {song.album}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">
                {formatTime(song.duration)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLike(song.id);
                }}
                className="text-white hover:text-red-400 hover:bg-white/10"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    song.isLiked ? 'fill-red-400 text-red-400' : ''
                  }`}
                />
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}