export interface VideoUser {
  _id: string;
  name?: string;
  email?: string;
  image?: string;
}

export interface VideoData {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;

  controls?: boolean;

  transformations?: {
    width?: number;
    height?: number;
    quality?: number;
  };

  userId: VideoUser;

  createdAt?: string;
  updatedAt?: string;
}
