import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  GestureResponderEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Shadows, Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { CategoryChip } from '../../src/components/common/CategoryChip';
import { MusicTrack, MusicCategory } from '../../src/types/content';
import { contentService } from '../../src/services/contentService';
import { mockMusic, MUSIC_ATTRIBUTION } from '../../src/data/mockMusic';
import { Headphones, Play, Pause, SkipBack, SkipForward, Repeat, Repeat1 } from 'lucide-react-native';

const CATEGORIES: ('All' | MusicCategory)[] = ['All', 'Piano', 'Meditation', 'Ambient', 'Sleep'];

const formatTime = (totalSeconds: number) => {
  const safe = Math.max(0, Math.floor(totalSeconds || 0));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default function CalmMusicScreen() {
  const { track: initialTrackId } = useLocalSearchParams<{ track?: string }>();
  const [selectedCat, setSelectedCat] = useState<'All' | MusicCategory>('All');
  const [tracks, setTracks] = useState<MusicTrack[]>(mockMusic);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [repeatOne, setRepeatOne] = useState(false);
  const [barWidth, setBarWidth] = useState(0);

  const player = useAudioPlayer(null, { updateInterval: 500 });
  const status = useAudioPlayerStatus(player);

  // Next / previous follow the visible list while the current song is in it
  const queue = currentTrack && tracks.some((t) => t.id === currentTrack.id) ? tracks : mockMusic;
  const duration = status.duration || currentTrack?.durationSeconds || 0;
  const progress = duration > 0 ? Math.min(status.currentTime / duration, 1) : 0;
  const isLoading = !!currentTrack && (!status.isLoaded || status.isBuffering) && !status.playing;

  const playTrack = (track: MusicTrack) => {
    setCurrentTrack(track);
    player.replace({ uri: track.url });
    player.loop = repeatOne;
    player.play();
  };

  const togglePlay = () => {
    if (!currentTrack) {
      playTrack(queue[0]);
    } else if (status.playing) {
      player.pause();
    } else {
      if (duration > 0 && status.currentTime >= duration - 0.5) player.seekTo(0);
      player.play();
    }
  };

  const skip = (direction: 1 | -1) => {
    if (!currentTrack) {
      playTrack(queue[0]);
      return;
    }
    if (direction === -1 && status.currentTime > 3) {
      player.seekTo(0);
      return;
    }
    const index = queue.findIndex((t) => t.id === currentTrack.id);
    playTrack(queue[(index + direction + queue.length) % queue.length]);
  };

  const toggleRepeat = () => {
    setRepeatOne(!repeatOne);
    player.loop = !repeatOne;
  };

  const handleSeek = (e: GestureResponderEvent) => {
    if (!currentTrack || !barWidth || !duration) return;
    const ratio = Math.min(Math.max(e.nativeEvent.locationX / barWidth, 0), 1);
    player.seekTo(ratio * duration);
  };

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true, interruptionMode: 'doNotMix' }).catch(() => {});
  }, []);

  useEffect(() => {
    contentService.getMusic(selectedCat as MusicCategory).then(setTracks);
  }, [selectedCat]);

  useEffect(() => {
    const initial = mockMusic.find((t) => t.id === initialTrackId);
    if (initial) playTrack(initial);
  }, [initialTrackId]);

  // Auto-play the next song when one ends (repeat-one is handled by player.loop)
  useEffect(() => {
    if (status.didJustFinish && !repeatOne) skip(1);
  }, [status.didJustFinish]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Calm Music" subtitle="Relaxing songs to unwind" showBack />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Now Playing Card */}
        <View style={styles.playerCard}>
          <View style={styles.playerTop}>
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>{currentTrack ? currentTrack.category : 'Calm Music'}</Text>
            </View>
            <Pressable
              onPress={toggleRepeat}
              style={[styles.repeatBtn, repeatOne && styles.repeatBtnActive]}
              accessibilityLabel={repeatOne ? 'Repeat this song: on' : 'Repeat this song: off'}
            >
              {repeatOne ? (
                <Repeat1 size={16} color={Colors.primaryDark} />
              ) : (
                <Repeat size={16} color={Colors.textLight} />
              )}
            </Pressable>
          </View>

          <View style={styles.artwork}>
            <View style={styles.artworkInner}>
              <Headphones size={40} color={Colors.primarySubtle} />
            </View>
          </View>

          <Text style={styles.nowTitle} numberOfLines={1}>
            {currentTrack ? currentTrack.title : 'Choose a calm song'}
          </Text>
          <Text style={styles.nowSub} numberOfLines={1}>
            {currentTrack ? `${currentTrack.artist} • ${currentTrack.mood}` : 'Tap any track below or press play'}
          </Text>

          {/* Seek Bar */}
          <Pressable
            onPress={handleSeek}
            onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
            style={styles.seekArea}
          >
            <View style={styles.seekTrack}>
              <View style={[styles.seekFill, { width: `${progress * 100}%` }]} />
            </View>
          </Pressable>
          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>{formatTime(status.currentTime)}</Text>
            <Text style={styles.timeLabel}>{formatTime(duration)}</Text>
          </View>

          {/* Controls */}
          <View style={styles.controlsRow}>
            <Pressable onPress={() => skip(-1)} style={styles.skipBtn} accessibilityLabel="Previous song">
              <SkipBack size={22} color={Colors.textLight} fill={Colors.textLight} />
            </Pressable>

            <Pressable
              onPress={togglePlay}
              style={({ pressed }) => [styles.mainPlayBtn, pressed && styles.pressed]}
              accessibilityLabel={status.playing ? 'Pause' : 'Play'}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.primaryDark} />
              ) : status.playing ? (
                <Pause size={28} color={Colors.primaryDark} fill={Colors.primaryDark} />
              ) : (
                <Play size={28} color={Colors.primaryDark} fill={Colors.primaryDark} />
              )}
            </Pressable>

            <Pressable onPress={() => skip(1)} style={styles.skipBtn} accessibilityLabel="Next song">
              <SkipForward size={22} color={Colors.textLight} fill={Colors.textLight} />
            </Pressable>
          </View>
        </View>

        {/* Category Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
          {CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat}
              label={cat}
              selected={selectedCat === cat}
              onPress={() => setSelectedCat(cat)}
            />
          ))}
        </ScrollView>

        {/* Track List */}
        <View style={styles.trackList}>
          {tracks.map((track) => {
            const isCurrent = currentTrack?.id === track.id;
            return (
              <Pressable
                key={track.id}
                onPress={() => (isCurrent ? togglePlay() : playTrack(track))}
                style={({ pressed }) => [
                  styles.trackRow,
                  isCurrent && styles.trackRowActive,
                  pressed && styles.pressed,
                ]}
              >
                <View style={[styles.trackIcon, isCurrent && styles.trackIconActive]}>
                  {isCurrent && status.playing ? (
                    <Pause size={16} color={Colors.textLight} fill={Colors.textLight} />
                  ) : (
                    <Play
                      size={16}
                      color={isCurrent ? Colors.textLight : Colors.primary}
                      fill={isCurrent ? Colors.textLight : Colors.primary}
                    />
                  )}
                </View>
                <View style={styles.trackInfo}>
                  <Text style={styles.trackCategory}>{track.category}</Text>
                  <Text style={[styles.trackTitle, isCurrent && styles.trackTitleActive]} numberOfLines={1}>
                    {track.title}
                  </Text>
                  <Text style={styles.trackMood} numberOfLines={1}>{track.mood}</Text>
                </View>
                <Text style={styles.trackDuration}>{formatTime(track.durationSeconds)}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.attribution}>
          {MUSIC_ATTRIBUTION} Songs stream online, so an internet connection is needed.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  playerCard: {
    backgroundColor: Colors.immersiveDark,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  playerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  tagBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  tagText: {
    color: Colors.textLight,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  repeatBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.immersiveCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  repeatBtnActive: {
    backgroundColor: Colors.primarySubtle,
  },
  artwork: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: Colors.immersiveCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.md,
  },
  artworkInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.immersiveTerracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nowTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textLight,
    textAlign: 'center',
  },
  nowSub: {
    fontSize: 13,
    color: Colors.peach,
    textAlign: 'center',
    marginTop: 4,
  },
  seekArea: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    marginTop: Spacing.md,
  },
  seekTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  seekFill: {
    height: '100%',
    backgroundColor: Colors.primaryLight,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
    marginTop: Spacing.sm,
  },
  skipBtn: {
    padding: Spacing.sm,
  },
  mainPlayBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipScroll: {
    marginVertical: Spacing.xs,
  },
  trackList: {
    marginTop: Spacing.xs,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.soft,
  },
  trackRowActive: {
    borderColor: Colors.primaryLight,
    backgroundColor: Colors.cardSecondary,
  },
  trackIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.lightOrange,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  trackIconActive: {
    backgroundColor: Colors.primary,
  },
  trackInfo: {
    flex: 1,
  },
  trackCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginVertical: 2,
  },
  trackTitleActive: {
    color: Colors.primaryDark,
  },
  trackMood: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  trackDuration: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    marginLeft: Spacing.sm,
  },
  attribution: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
    marginTop: Spacing.md,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
});
