import { Video, Category } from './types';

export const categories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'music', name: 'Music' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'news', name: 'News' },
  { id: 'live', name: 'Live' },
  { id: 'sports', name: 'Sports' },
  { id: 'education', name: 'Education' },
  { id: 'technology', name: 'Technology' },
];

export const videos: Video[] = [
  {
    id: '1',
    title: 'Building a Modern Web Application',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    channel: {
      name: 'Tech Academy',
      avatar: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=64&q=80',
    },
    views: '120K',
    timestamp: '2 days ago',
    duration: '15:24',
  },
  {
    id: '2',
    title: 'The Future of Artificial Intelligence',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    channel: {
      name: 'AI Insights',
      avatar: 'https://images.unsplash.com/photo-1525373698358-041e3a460346?w=64&q=80',
    },
    views: '250K',
    timestamp: '5 days ago',
    duration: '22:15',
  },
  {
    id: '3',
    title: 'Learn TypeScript in 2024',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
    channel: {
      name: 'Code Masters',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=64&q=80',
    },
    views: '180K',
    timestamp: '1 week ago',
    duration: '18:30',
  },
];