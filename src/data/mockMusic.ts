import { MusicTrack } from '../types/content';

// All tracks by Kevin MacLeod (incompetech.com), licensed under Creative Commons: By Attribution 4.0
// https://creativecommons.org/licenses/by/4.0/ — attribution is shown on the music screen.
const INCOMPETECH_BASE = 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/';
const ARTIST = 'Kevin MacLeod';

const trackUrl = (fileName: string) => `${INCOMPETECH_BASE}${encodeURIComponent(fileName)}.mp3`;

export const MUSIC_ATTRIBUTION =
  'Music by Kevin MacLeod (incompetech.com), licensed under Creative Commons: By Attribution 4.0.';

export const mockMusic: MusicTrack[] = [
  // Piano
  {
    id: 'music_relaxing_piano',
    title: 'Relaxing Piano Music',
    artist: ARTIST,
    category: 'Piano',
    mood: 'Long, gentle piano for study sessions',
    durationSeconds: 1494,
    url: trackUrl('Relaxing Piano Music'),
  },
  {
    id: 'music_gymnopedie',
    title: 'Gymnopedie No. 1',
    artist: ARTIST,
    category: 'Piano',
    mood: 'Classic, slow and soothing',
    durationSeconds: 187,
    url: trackUrl('Gymnopedie No 1'),
  },
  {
    id: 'music_dreamer',
    title: 'Dreamer',
    artist: ARTIST,
    category: 'Piano',
    mood: 'Soft and hopeful',
    durationSeconds: 204,
    url: trackUrl('Dreamer'),
  },
  {
    id: 'music_wholesome',
    title: 'Wholesome',
    artist: ARTIST,
    category: 'Piano',
    mood: 'Warm and comforting',
    durationSeconds: 364,
    url: trackUrl('Wholesome'),
  },

  // Meditation
  {
    id: 'music_meditation_01',
    title: 'Meditation Impromptu 01',
    artist: ARTIST,
    category: 'Meditation',
    mood: 'Quiet focus for mindful breathing',
    durationSeconds: 213,
    url: trackUrl('Meditation Impromptu 01'),
  },
  {
    id: 'music_meditation_02',
    title: 'Meditation Impromptu 02',
    artist: ARTIST,
    category: 'Meditation',
    mood: 'Slow, spacious and grounding',
    durationSeconds: 249,
    url: trackUrl('Meditation Impromptu 02'),
  },
  {
    id: 'music_meditation_03',
    title: 'Meditation Impromptu 03',
    artist: ARTIST,
    category: 'Meditation',
    mood: 'Gentle tones to release tension',
    durationSeconds: 255,
    url: trackUrl('Meditation Impromptu 03'),
  },
  {
    id: 'music_healing',
    title: 'Healing',
    artist: ARTIST,
    category: 'Meditation',
    mood: 'Deep calm for body scans',
    durationSeconds: 520,
    url: trackUrl('Healing'),
  },

  // Ambient
  {
    id: 'music_clean_soul',
    title: 'Clean Soul',
    artist: ARTIST,
    category: 'Ambient',
    mood: 'Light and refreshing reset',
    durationSeconds: 307,
    url: trackUrl('Clean Soul'),
  },
  {
    id: 'music_floating_cities',
    title: 'Floating Cities',
    artist: ARTIST,
    category: 'Ambient',
    mood: 'Airy background for reading',
    durationSeconds: 184,
    url: trackUrl('Floating Cities'),
  },
  {
    id: 'music_bathed_in_light',
    title: 'Bathed in the Light',
    artist: ARTIST,
    category: 'Ambient',
    mood: 'Bright, peaceful pads',
    durationSeconds: 166,
    url: trackUrl('Bathed in the Light'),
  },
  {
    id: 'music_ether_vox',
    title: 'Ether Vox',
    artist: ARTIST,
    category: 'Ambient',
    mood: 'Soft voices and drifting textures',
    durationSeconds: 206,
    url: trackUrl('Ether Vox'),
  },

  // Sleep
  {
    id: 'music_calmant',
    title: 'Calmant',
    artist: ARTIST,
    category: 'Sleep',
    mood: 'Slows racing thoughts before bed',
    durationSeconds: 204,
    url: trackUrl('Calmant'),
  },
  {
    id: 'music_dream_culture',
    title: 'Dream Culture',
    artist: ARTIST,
    category: 'Sleep',
    mood: 'Hazy and dreamlike wind-down',
    durationSeconds: 214,
    url: trackUrl('Dream Culture'),
  },
  {
    id: 'music_night_vigil',
    title: 'Night Vigil',
    artist: ARTIST,
    category: 'Sleep',
    mood: 'Still, late-night atmosphere',
    durationSeconds: 288,
    url: trackUrl('Night Vigil'),
  },
  {
    id: 'music_peaceful_desolation',
    title: 'Peaceful Desolation',
    artist: ARTIST,
    category: 'Sleep',
    mood: 'Short, quiet drift into rest',
    durationSeconds: 91,
    url: trackUrl('Peaceful Desolation'),
  },
];
