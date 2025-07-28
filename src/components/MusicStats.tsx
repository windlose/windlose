'use client';

import { motion } from 'framer-motion';
import { Clock, Heart, Play, Music } from 'lucide-react';

interface MusicStatsProps {
  totalSongs: number;
  likedSongs: number;
  totalDuration: number;
  currentSong: string | null;
}

export default function MusicStats({
  totalSongs,
  likedSongs,
  totalDuration,
  currentSong
}: MusicStatsProps) {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const stats = [
    {
      icon: Music,
      label: "总歌曲",
      value: totalSongs.toString(),
      color: "text-blue-400"
    },
    {
      icon: Heart,
      label: "收藏歌曲",
      value: likedSongs.toString(),
      color: "text-red-400"
    },
    {
      icon: Clock,
      label: "总时长",
      value: formatDuration(totalDuration),
      color: "text-green-400"
    },
    {
      icon: Play,
      label: "正在播放",
      value: currentSong || "无",
      color: "text-purple-400"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-gray-300">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}