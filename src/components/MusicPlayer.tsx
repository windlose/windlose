'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface MusicPlayerProps {
  currentSong: {
    title: string;
    artist: string;
    album: string;
    cover: string;
    audioUrl: string;
  } | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  currentTime: number;
  duration: number;
  volume: number;
}

export default function MusicPlayer({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
  onVolumeChange,
  currentTime,
  duration,
  volume
}: MusicPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<'none' | 'all' | 'one'>('none');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    onVolumeChange(isMuted ? volume : 0);
  };

  const handleRepeatToggle = () => {
    const modes: Array<'none' | 'all' | 'one'> = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(repeat);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeat(modes[nextIndex]);
  };

  if (!currentSong) {
    return (
      <div className="flex items-center justify-center h-20 bg-black/20 rounded-lg">
        <p className="text-gray-400">选择一首歌开始播放</p>
      </div>
    );
  }

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6">
      <div className="flex items-center gap-4 mb-6">
        <motion.img
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-16 h-16 rounded-lg object-cover"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 20, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{currentSong.title}</h3>
          <p className="text-sm text-gray-300 truncate">{currentSong.artist}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-300 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={(value) => onSeek(value[0])}
          className="w-full"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShuffle(!shuffle)}
            className={`text-white hover:bg-white/10 ${shuffle ? 'text-purple-400' : ''}`}
          >
            <Shuffle className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrev}
            className="text-white hover:bg-white/10"
          >
            <SkipBack className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={onPlayPause}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onNext}
            className="text-white hover:bg-white/10"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRepeatToggle}
            className={`text-white hover:bg-white/10 ${
              repeat !== 'none' ? 'text-purple-400' : ''
            }`}
          >
            {repeat === 'one' ? (
              <Repeat1 className="w-4 h-4" />
            ) : (
              <Repeat className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2 mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMuteToggle}
          className="text-white hover:bg-white/10"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={1}
          step={0.1}
          onValueChange={(value) => {
            onVolumeChange(value[0]);
            if (value[0] > 0) setIsMuted(false);
          }}
          className="flex-1"
        />
      </div>
    </div>
  );
}