import AsyncStorage from '@react-native-async-storage/async-storage';
import { Destination, Interest, Category } from '@/types';

const CATEGORIES: Category[] = [
  {
    id: 'hidden-trails',
    name: 'Hidden Trails',
    description: 'Discover secret paths and unexplored routes',
    icon: 'Footprints',
    color: '#B45309'
  },
  {
    id: 'himalayas',
    name: 'Himalayas',
    description: 'Majestic mountain peaks and treks',
    icon: 'Mountain',
    color: '#3B82F6'
  },
  {
    id: 'cultural',
    name: 'Cultural Sites',
    description: 'Ancient temples and traditional villages',
    icon: 'Landmark',
    color: '#8B5CF6'
  },
  {
    id: 'nearby',
    name: 'Near You',
    description: 'Attractions close to your location',
    icon: 'MapPin',
    color: '#10B981'
  }
];

const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Champadevi Hidden Trail',
    region: 'Kathmandu Valley',
    category: 'hidden-trails',
    description: 'A lesser-known hiking trail that offers panoramic views of the Kathmandu Valley and the Himalayan range. This hidden gem starts from Pharping and takes you through dense forests, traditional villages, and eventually to the sacred Champadevi temple at 2,285m. The trail is particularly beautiful during spring when rhododendrons bloom.',
    images: [
      'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg',
      'https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg',
      'https://images.pexels.com/photos/4215110/pexels-photo-4215110.jpeg'
    ],
    coordinates: {
      latitude: 27.6289,
      longitude: 85.2374
    },
    rating: 4.7,
    duration: '5-6 hours',
    price: 'Free',
    hasAudioGuide: false,
    howToGetThere: 'Option 1: Take a bus from Ratnapark to Pharping (1 hour). The trail starts near the Pharping Monastery. Option 2: Take a taxi directly to Pharping (45 minutes from Thamel). Option 3: Drive to Pharping and park near the monastery. The trail is well-marked with red and white flags.',
    bestTimeToVisit: 'October to May, avoiding monsoon season. Early morning starts are recommended for clear mountain views.',
    facilities: [
      'Local tea shops on route',
      'Temple rest areas',
      'Natural water sources'
    ],
    interests: ['hiking', 'nature', 'cultural']
  },
  {
    id: '2',
    name: 'Sundarijal Secret Waterfall',
    region: 'Shivapuri National Park',
    category: 'nature',
    description: 'Hidden deep within Shivapuri National Park, this secluded waterfall is accessed via a less-traveled trail through pristine forest. The journey takes you past local water collection points, through bamboo groves, and finally to a stunning multi-tiered waterfall. Perfect for those seeking solitude and natural beauty.',
    images: [
      'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg',
      'https://images.pexels.com/photos/2876511/pexels-photo-2876511.jpeg',
      'https://images.pexels.com/photos/2740956/pexels-photo-2740956.jpeg'
    ],
    coordinates: {
      latitude: 27.7619,
      longitude: 85.4277
    },
    rating: 4.8,
    duration: '3-4 hours',
    price: 'NPR 100',
    hasAudioGuide: false,
    howToGetThere: 'Option 1: Take a bus from Boudha to Sundarijal (30 minutes). Option 2: Take a taxi from Kathmandu (45 minutes). From Sundarijal entrance, follow the water pipeline trail for 1km, then take the right fork at the bamboo grove. Local guides available at entrance.',
    bestTimeToVisit: 'March to May for moderate water flow. Spectacular during monsoon but trail can be slippery.',
    facilities: [
      'Park entrance office',
      'Local guides',
      'Small shops at start',
      'Rest shelters'
    ],
    interests: ['hiking', 'nature', 'photography']
  },
  {
    id: '3',
    name: 'Khokana Heritage Village',
    region: 'Lalitpur',
    category: 'cultural',
    description: 'A hidden medieval Newari village known for its traditional mustard oil production and preserved architecture. This UNESCO tentative site offers an authentic glimpse into traditional Newari life, with its unique temples, oil press demonstrations, and traditional farming practices still in use.',
    images: [
      'https://images.pexels.com/photos/5458388/pexels-photo-5458388.jpeg',
      'https://images.pexels.com/photos/4215104/pexels-photo-4215104.jpeg',
      'https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg'
    ],
    coordinates: {
      latitude: 27.6289,
      longitude: 85.2374
    },
    rating: 4.6,
    duration: '2-3 hours',
    price: 'Free',
    hasAudioGuide: true,
    audioGuide: 'https://example.com/audio/khokana.mp3',
    howToGetThere: 'Option 1: Take a local bus from Lagankhel to Khokana (20 minutes). Option 2: Take a taxi from Patan (15 minutes). Option 3: Cycle from Patan through scenic countryside (40 minutes).',
    bestTimeToVisit: 'October to March. Visit during festivals for cultural experiences. Weekends for oil press demonstrations.',
    facilities: [
      'Local homestays',
      'Traditional restaurants',
      'Cultural guides',
      'Photography spots'
    ],
    interests: ['cultural', 'photography', 'food']
  },
  {
    id: '4',
    name: 'Pilot Baba Cave',
    region: 'Shivapuri',
    category: 'adventure',
    description: 'A mysterious cave with a fascinating history, named after an Indian pilot who meditated here for years. The cave offers a unique blend of adventure and spiritual significance. The challenging trail leads through dense forest and offers stunning valley views.',
    images: [
      'https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg',
      'https://images.pexels.com/photos/4215110/pexels-photo-4215110.jpeg',
      'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg'
    ],
    coordinates: {
      latitude: 27.7892,
      longitude: 85.3867
    },
    rating: 4.5,
    duration: '4-5 hours',
    price: 'NPR 150',
    hasAudioGuide: false,
    howToGetThere: 'Option 1: Take a bus to Budhanilkantha, then hike up (1 hour). Option 2: Drive to Shivapuri park entrance and take the marked trail. Option 3: Join a guided tour from Thamel. Proper hiking shoes and flashlight required.',
    bestTimeToVisit: 'October to April. Early morning starts recommended for clear weather.',
    facilities: [
      'Park entrance',
      'Guide services',
      'Rest points',
      'Temple facilities'
    ],
    interests: ['adventure', 'spiritual', 'hiking']
  }
];

const INTERESTS: Interest[] = [
  {
    id: 'hiking',
    name: 'Hiking',
    icon: 'https://example.com/icons/hiking.png'
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: 'https://example.com/icons/nature.png'
  },
  {
    id: 'cultural',
    name: 'Cultural',
    icon: 'https://example.com/icons/cultural.png'
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: 'https://example.com/icons/photography.png'
  },
  {
    id: 'adventure',
    name: 'Adventure',
    icon: 'https://example.com/icons/adventure.png'
  },
  {
    id: 'spiritual',
    name: 'Spiritual',
    icon: 'https://example.com/icons/spiritual.png'
  }
];

export async function getCategories(): Promise<Category[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return CATEGORIES;
}

export async function getDestinationsByCategory(categoryId: string): Promise<Destination[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return DESTINATIONS.filter(dest => dest.category === categoryId);
}

export async function getAllDestinations(): Promise<Destination[]> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return DESTINATIONS;
}

export async function getDestinationById(id: string): Promise<Destination | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return DESTINATIONS.find(dest => dest.id === id) || null;
}

export async function getTopDestinations(): Promise<Destination[]> {
  await new Promise(resolve => setTimeout(resolve, 800));
  return DESTINATIONS.slice(0, 2);
}

export async function getNearbyAttractions(): Promise<Destination[]> {
  await new Promise(resolve => setTimeout(resolve, 800));
  return DESTINATIONS.slice(2);
}

export async function getDestinationsByIds(ids: string[]): Promise<Destination[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return DESTINATIONS.filter(dest => ids.includes(dest.id));
}

export async function getInterests(): Promise<Interest[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return INTERESTS;
}