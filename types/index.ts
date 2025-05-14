export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  category: string;
  description: string;
  images: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  duration: string;
  price: string;
  audioGuide?: string;
  hasAudioGuide: boolean;
  howToGetThere: string;
  bestTimeToVisit: string;
  facilities: string[];
  interests: string[];
}

export interface Interest {
  id: string;
  name: string;
  icon: string;
}