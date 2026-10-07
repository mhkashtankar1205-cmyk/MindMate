import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Spacing } from '../../src/constants/theme';
import { mockMusic } from '../../src/data/mockMusic';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Music, Minus, Plus } from 'lucide-react-native';

// Slow, calm songs that suit box breathing. Tapping the theme cycles through these, then "Off".
const BREATHING_MUSIC = [
  { label: 'Meditation', trackId: 'music_meditation_01' },
  { label: 'Soft Piano', trackId: 'music_relaxing_piano' },
  { label: 'Healing', trackId: 'music_healing' },
  { label: 'Calm Night', trackId: 'music_calmant' },
].map(({ label, trackId }) => ({ label, track: mockMusic.find((t) => t.id === trackId)! }));

const VOLUME_STEP = 10;

export default function BreathingPlayerScreen() {
  const router = useRouter();

  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [seconds, setSeconds] = useState(4);
  const [isPlaying, setIsPlaying] = useState(true);
  const [circleScale, setCircleScale] = useState(140);
  const [volume, setVolume] = useState(60);
  const [musicIndex, setMusicIndex] = useState(0); // BREATHING_MUSIC.length means music is off

  const music = BREATHING_MUSIC[musicIndex] ?? null;
  const player = useAudioPlayer(null);
  const musicStatus = useAudioPlayerStatus(player);
  const isMusicLoading = !!music && isPlaying && (!musicStatus.isLoaded || musicStatus.isBuffering) && !musicStatus.playing;

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true, interruptionMode: 'doNotMix' }).catch(() => {});
  }, []);

  // Load the chosen song and loop it for the whole session
  useEffect(() => {
    if (!music) {
      player.pause();
      return;
    }
    player.replace({ uri: music.track.url });
    player.loop = true;
    player.volume = volume / 100;
    if (isPlaying) player.play();
  }, [musicIndex]);

  // Music follows the breathing timer's play / pause
  useEffect(() => {
    if (!music) return;
    if (isPlaying) player.play();
    else player.pause();
  }, [isPlaying]);

  useEffect(() => {
    player.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (isPlaying) {
      timer = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec > 1) return prevSec - 1;

          // Phase transition
          if (phase === 'Inhale') {
            setPhase('Hold');
            return 4;
          } else if (phase === 'Hold') {
            setPhase('Exhale');
            return 4;
          } else if (phase === 'Exhale') {
            setPhase('Pause');
            return 4;
          } else {
            setPhase('Inhale');
            return 4;
          }
        });

        // Circle animation scaling
        setCircleScale((prev) => {
          if (phase === 'Inhale') return Math.min(220, prev + 12);
          if (phase === 'Exhale') return Math.max(130, prev - 12);
          return prev;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, phase]);

  const cycleMusic = () => {
    setMusicIndex((prev) => (prev + 1) % (BREATHING_MUSIC.length + 1));
  };

  const changeVolume = (delta: number) => {
    setVolume((prev) => Math.min(100, Math.max(0, prev + delta)));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={22} color={Colors.textLight} />
        </Pressable>
        <Text style={styles.headerTitle}>Breath Awareness</Text>
        <Pressable onPress={cycleMusic} style={styles.ambienceBadge}>
          {music ? <Sparkles size={14} color="#FFE1D3" /> : <VolumeX size={14} color="#FFE1D3" />}
          <Text style={styles.ambienceText}>{music ? music.label : 'Music Off'}</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.tagline}>Stress Relief</Text>
        <Text style={styles.instructionText}>Take a deep breath...</Text>
        <Text style={styles.countdownSub}>Box Breathing • 4-4-4-4 Technique</Text>

        {/* Animated Expanding Circle */}
        <View style={styles.circleArea}>
          <View
            style={[
              styles.breathingCircle,
              { width: circleScale, height: circleScale, borderRadius: circleScale / 2 },
            ]}
          >
            <Text style={styles.phaseLabel}>{phase}</Text>
            <Text style={styles.secDisplay}>{seconds}s</Text>
          </View>
        </View>

        {/* Interactive Controls Overlay (Matching design inspiration screenshot!) */}
        <View style={styles.controlPanel}>
          <View style={styles.controlRow}>
            <Volume2 size={18} color="#FFE1D3" />
            <Text style={styles.controlLabel}>Music Volume</Text>
            <Pressable
              onPress={() => changeVolume(-VOLUME_STEP)}
              style={styles.volumeBtn}
              accessibilityLabel="Lower music volume"
            >
              <Minus size={14} color={Colors.textLight} />
            </Pressable>
            <Text style={[styles.controlVal, styles.volumeVal]}>{volume}%</Text>
            <Pressable
              onPress={() => changeVolume(VOLUME_STEP)}
              style={styles.volumeBtn}
              accessibilityLabel="Raise music volume"
            >
              <Plus size={14} color={Colors.textLight} />
            </Pressable>
          </View>

          <View style={styles.controlRow}>
            <Music size={18} color="#FFE1D3" />
            <Text style={styles.controlLabel}>Background Music</Text>
            {isMusicLoading && <ActivityIndicator size="small" color="#FFE1D3" style={styles.musicLoader} />}
            <Pressable onPress={cycleMusic}>
              <Text style={styles.controlValText}>{music ? music.label : 'Off'}</Text>
            </Pressable>
          </View>

          {music && (
            <Text style={styles.musicCredit} numberOfLines={2}>
              "{music.track.title}" by Kevin MacLeod (incompetech.com) • CC BY 4.0
            </Text>
          )}

          <View style={styles.buttonsRow}>
            <Pressable
              onPress={() => {
                setPhase('Inhale');
                setSeconds(4);
                setCircleScale(140);
              }}
              style={styles.iconBtn}
            >
              <RotateCcw size={20} color={Colors.textLight} />
            </Pressable>

            <Pressable
              onPress={() => setIsPlaying(!isPlaying)}
              style={styles.playBtn}
            >
              {isPlaying ? (
                <Pause size={24} color={Colors.primaryDark} />
              ) : (
                <Play size={24} color={Colors.primaryDark} fill={Colors.primaryDark} />
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8D2F17', // Dark Terracotta/Orange palette from inspiration screenshot!
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  backBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textLight,
  },
  ambienceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  ambienceText: {
    color: '#FFE1D3',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-between',
    paddingBottom: Spacing.xl,
  },
  tagline: {
    color: '#F8C7AE',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: Spacing.md,
  },
  instructionText: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.textLight,
    marginTop: 4,
  },
  countdownSub: {
    fontSize: 14,
    color: '#F8C7AE',
    marginTop: 2,
  },
  circleArea: {
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathingCircle: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },
  phaseLabel: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textLight,
  },
  secDisplay: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.textLight,
    marginTop: 2,
  },
  controlPanel: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    gap: 12,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlLabel: {
    fontSize: 13,
    color: Colors.textLight,
    flex: 1,
    marginLeft: 8,
  },
  controlVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFE1D3',
  },
  controlValText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFE1D3',
    textDecorationLine: 'underline',
  },
  volumeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  volumeVal: {
    minWidth: 44,
    textAlign: 'center',
  },
  musicLoader: {
    marginRight: 8,
  },
  musicCredit: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginTop: 6,
  },
  iconBtn: {
    padding: 12,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  playBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFE1D3',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
});
