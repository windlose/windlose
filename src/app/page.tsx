'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, List, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MusicPlayer from '@/components/MusicPlayer';
import Playlist from '@/components/Playlist';
import MusicStats from '@/components/MusicStats';
import { Song, sampleSongs } from '@/data/songs';

export default function MusicApp() {
  const [songs, setSongs] = useState<Song[]>(sampleSongs);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPlaylist, setShowPlaylist] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = song.audioUrl;
      audioRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleLike = (songId: number) => {
    setSongs(songs.map(song =>
      song.id === songId ? { ...song, isLiked: !song.isLiked } : song
    ));
  };

  const nextSong = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex(song => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % songs.length;
      handleSongSelect(songs[nextIndex]);
    }
  };

  const prevSong = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex(song => song.id === currentSong.id);
      const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
      handleSongSelect(songs[prevIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextSong}
      />
      
      {/* Header */}
      <header className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            MusicApp
          </motion.h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索音乐..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="text-white hover:bg-white/10"
            >
              {showPlaylist ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-200px)]">
        {/* Playlist Sidebar */}
        {showPlaylist && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-80 border-r border-white/10 p-6 overflow-y-auto"
          >
            <h2 className="text-xl font-semibold mb-4">播放列表</h2>
            <Playlist
              songs={filteredSongs}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onSongSelect={handleSongSelect}
              onToggleLike={toggleLike}
              onPlayPause={handlePlayPause}
            />
          </motion.div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Music Stats */}
          <MusicStats
            totalSongs={songs.length}
            likedSongs={songs.filter(song => song.isLiked).length}
            totalDuration={songs.reduce((total, song) => total + song.duration, 0)}
            currentSong={currentSong?.title || null}
          />
          
          {currentSong ? (
            <div className="h-full flex flex-col">
              {/* Current Song Display */}
              <div className="text-center mb-8">
                <motion.img
                  src={currentSong.cover}
                  alt={currentSong.title}
                  className="w-64 h-64 mx-auto rounded-2xl shadow-2xl mb-6"
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 20, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                />
                <motion.h2 
                  className="text-2xl font-bold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentSong.title}
                </motion.h2>
                <motion.p 
                  className="text-lg text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {currentSong.artist}
                </motion.p>
                <motion.p 
                  className="text-sm text-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {currentSong.album}
                </motion.p>
              </div>

              {/* Music Player */}
              <div className="flex-1 flex items-end">
                <MusicPlayer
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  onPlayPause={handlePlayPause}
                  onNext={nextSong}
                  onPrev={prevSong}
                  onSeek={handleSeek}
                  onVolumeChange={handleVolumeChange}
                  currentTime={currentTime}
                  duration={duration}
                  volume={volume}
                />
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-32 h-32 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
                  <Search className="w-16 h-16 text-white/50" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">选择一首歌开始播放</h2>
                <p className="text-gray-400">从左侧播放列表中选择你喜欢的音乐</p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
