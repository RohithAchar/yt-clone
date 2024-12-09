export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: {
    name: string;
    avatar: string;
  };
  views: string;
  timestamp: string;
  duration: string;
}

export interface Category {
  id: string;
  name: string;
}