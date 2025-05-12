import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Play, Pause, X, SkipBack, SkipForward } from 'lucide-react-native';

interface AudioPlayerProps {
  title: string;
  audioUrl: string;
  onClose: () => void;
}

export default function AudioPlayer({ title, audioUrl, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // Mock duration in seconds

  // In a real implementation, you would use the Expo Audio API to control playback
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {title} - Audio Guide
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={20} color="#1E293B" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${(currentTime / duration) * 100}%` }]} />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity style={styles.secondaryButton}>
          <SkipBack size={24} color="#1E293B" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
          {isPlaying ? (
            <Pause size={32} color="#FFFFFF" />
          ) : (
            <Play size={32} color="#FFFFFF" />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton}>
          <SkipForward size={24} color="#1E293B" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.languages}>
        <TouchableOpacity style={[styles.languageButton, styles.activeLanguage]}>
          <Text style={styles.activeLanguageText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageText}>नेपाली</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#1E40AF',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  secondaryButton: {
    padding: 12,
  },
  playButton: {
    backgroundColor: '#1E40AF',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  languages: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  activeLanguage: {
    backgroundColor: '#EFF6FF',
  },
  languageText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  activeLanguageText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E40AF',
  },
});