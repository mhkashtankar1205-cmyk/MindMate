import { StoryItem, BookItem, GameItem, MusicTrack, StoryCategory, BookCategory, MusicCategory } from '../types/content';
import { mockStories } from '../data/mockStories';
import { mockBooks } from '../data/mockBooks';
import { mockGames } from '../data/mockGames';
import { mockMusic } from '../data/mockMusic';

export const contentService = {
  async getStories(category?: StoryCategory): Promise<StoryItem[]> {
    if (!category || category === ('All' as unknown)) return mockStories;
    return mockStories.filter((s) => s.category === category);
  },

  async getStoryById(id: string): Promise<StoryItem | undefined> {
    return mockStories.find((s) => s.id === id);
  },

  async getBooks(category?: BookCategory): Promise<BookItem[]> {
    if (!category || category === ('All' as unknown)) return mockBooks;
    return mockBooks.filter((b) => b.category === category);
  },

  async getBookById(id: string): Promise<BookItem | undefined> {
    return mockBooks.find((b) => b.id === id);
  },

  async getGames(): Promise<GameItem[]> {
    return mockGames;
  },

  async getMusic(category?: MusicCategory): Promise<MusicTrack[]> {
    if (!category || category === ('All' as unknown)) return mockMusic;
    return mockMusic.filter((t) => t.category === category);
  },
};
