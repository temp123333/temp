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
    name: 'Nagarkot Sunrise View',
    region: 'Bhaktapur',
    category: 'himalayas',
    description: `Perched at an elevation of 2,175 meters, Nagarkot offers one of the most breathtaking panoramic views of the Himalayan range. On a clear day, you can see eight out of thirteen Himalayan ranges from the view tower, including Mount Everest in the east and Dhaulagiri in the west. The sunrise view is particularly spectacular, as the first rays of the sun paint the snow-capped peaks in hues of gold and pink.

The hill station is surrounded by terraced hillsides and pine forests, making it a perfect escape from the bustling city life of Kathmandu. The area is also known for its rich biodiversity and is a haven for bird watchers, with over 100 species of birds inhabiting the region.

Historical significance: During the ancient times, Nagarkot was an ancient fort city, strategically built to monitor external activities in other kingdoms. Today, it has transformed into a peaceful retreat that attracts nature lovers and photography enthusiasts from around the world.`,
    images: [
      'https://images.pexels.com/photos/2437291/pexels-photo-2437291.jpeg',
      'https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg',
      'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg'
    ],
    coordinates: {
      latitude: 27.7156,
      longitude: 85.5200
    },
    rating: 4.8,
    duration: 'Full day',
    price: 'NPR 200',
    hasAudioGuide: false,
    howToGetThere: `Option 1: Take a direct bus from Kathmandu's Ratna Park to Nagarkot (2 hours).
Option 2: Take a taxi from Kathmandu (1-1.5 hours).
Option 3: Take a local bus to Bhaktapur, then transfer to a Nagarkot-bound bus.
Option 4: Hire a private car with driver for more flexibility.`,
    bestTimeToVisit: 'October to December for clearest mountain views. Arrive before sunrise (around 5 AM) for the best experience. The winter months offer the clearest views but can be quite cold.',
    facilities: [
      'Luxury Hotels',
      'Budget Guesthouses',
      'Mountain View Cafes',
      'View Tower',
      'Hiking Trails',
      'Photography Points',
      'Guide Services',
      'Mountain Bikes for Rent'
    ],
    interests: ['nature', 'photography', 'hiking', 'adventure']
  },
  {
    id: '2',
    name: 'Boudhanath Stupa',
    region: 'Kathmandu',
    category: 'cultural',
    description: 'One of the largest spherical stupas in Nepal and a UNESCO World Heritage Site. The Buddhist monument dominates the skyline and is surrounded by monasteries.',
    images: [
      'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg',
      'https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg'
    ],
    coordinates: {
      latitude: 27.7219,
      longitude: 85.3621
    },
    rating: 4.9,
    duration: '2-3 hours',
    price: 'NPR 400',
    hasAudioGuide: false,
    howToGetThere: 'Taxi or local bus from anywhere in Kathmandu',
    bestTimeToVisit: 'Early morning or evening',
    facilities: [
      'Restaurants',
      'Souvenir shops',
      'Meditation centers'
    ],
    interests: ['cultural', 'spiritual']
  },
  {
    id: '3',
    name: 'Pokhara Lakeside',
    region: 'Pokhara',
    category: 'nature',
    description: 'The beautiful Phewa Lake surrounded by restaurants, shops and views of the Annapurna mountain range. The lakeside area is the main tourist hub of Pokhara.',
    images: [
      'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg',
      'https://images.pexels.com/photos/3225529/pexels-photo-3225529.jpeg'
    ],
    coordinates: {
      latitude: 28.2096,
      longitude: 83.9856
    },
    rating: 4.7,
    duration: 'Half day',
    price: 'Free',
    hasAudioGuide: false,
    howToGetThere: '25 minute drive from Pokhara airport',
    bestTimeToVisit: 'Year-round',
    facilities: [
      'Hotels',
      'Restaurants',
      'Boat rentals'
    ],
    interests: ['nature', 'photography']
  },
  {
    id: '4',
    name: 'Chitwan National Park',
    region: 'Chitwan',
    category: 'nature',
    description: 'UNESCO World Heritage Site known for wildlife viewing including rhinos, elephants and Bengal tigers. Offers jungle safaris and cultural programs.',
    images: [
      'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg',
      'https://images.pexels.com/photos/1457812/pexels-photo-1457812.jpeg'
    ],
    coordinates: {
      latitude: 27.5333,
      longitude: 84.3333
    },
    rating: 4.8,
    duration: '2-3 days',
    price: 'NPR 2000+',
    hasAudioGuide: false,
    howToGetThere: '5-6 hour drive from Kathmandu or 25 minute flight',
    bestTimeToVisit: 'October to March',
    facilities: [
      'Lodges',
      'Safari tours',
      'Visitor center'
    ],
    interests: ['nature', 'adventure']
  },
  {
    id: '5',
    name: 'Patan Durbar Square',
    region: 'Lalitpur',
    category: 'cultural',
    description: 'Ancient royal palace complex with exquisite Newari architecture, temples and statues. Another UNESCO World Heritage Site in the Kathmandu Valley.',
    images: [
      'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg',
      'https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg'
    ],
    coordinates: {
      latitude: 27.6736,
      longitude: 85.3243
    },
    rating: 4.6,
    duration: '2 hours',
    price: 'NPR 1000',
    hasAudioGuide: false,
    howToGetThere: 'Short taxi ride from Kathmandu',
    bestTimeToVisit: 'Morning hours',
    facilities: [
      'Museum',
      'Cafes',
      'Guided tours'
    ],
    interests: ['cultural', 'photography']
  },
  {
    id: '6',
    name: 'Everest Base Camp Trek',
    region: 'Solukhumbu',
    category: 'himalayas',
    description: 'The iconic trek to the base of the worlds highest mountain. Challenging but rewarding journey through Sherpa villages and high Himalayan landscapes.',
    images: [
      'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
      'https://images.pexels.com/photos/3255761/pexels-photo-3255761.jpeg'
    ],
    coordinates: {
      latitude: 27.9881,
      longitude: 86.9250
    },
    rating: 4.9,
    duration: '12-14 days',
    price: 'NPR 150,000+',
    hasAudioGuide: false,
    howToGetThere: 'Fly to Lukla from Kathmandu then trek',
    bestTimeToVisit: 'March-May and September-November',
    facilities: [
      'Teahouses',
      'Guide services',
      'Medical posts'
    ],
    interests: ['hiking', 'adventure']
  },
  {
    id: '7',
    name: 'Lumbini',
    region: 'Rupandehi',
    category: 'cultural',
    description: 'Birthplace of Lord Buddha and important pilgrimage site. Features monasteries from different countries, the sacred garden and Maya Devi Temple.',
    images: [
      'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg',
      'https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg'
    ],
    coordinates: {
      latitude: 27.4692,
      longitude: 83.2756
    },
    rating: 4.7,
    duration: 'Full day',
    price: 'NPR 500',
    hasAudioGuide: false,
    howToGetThere: '1 hour flight or 8 hour drive from Kathmandu',
    bestTimeToVisit: 'October to March',
    facilities: [
      'Hotels',
      'Restaurants',
      'Museum'
    ],
    interests: ['cultural', 'spiritual']
  },
  {
    id: '8',
    name: 'Annapurna Circuit',
    region: 'Annapurna',
    category: 'himalayas',
    description: 'One of the worlds classic treks circling the Annapurna massif. Passes through diverse landscapes from subtropical to alpine zones.',
    images: [
      'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
      'https://images.pexels.com/photos/3255761/pexels-photo-3255761.jpeg'
    ],
    coordinates: {
      latitude: 28.5275,
      longitude: 83.9436
    },
    rating: 4.9,
    duration: '15-20 days',
    price: 'NPR 120,000+',
    hasAudioGuide: false,
    howToGetThere: 'Drive or bus to Besisahar then trek',
    bestTimeToVisit: 'March-May and September-November',
    facilities: [
      'Teahouses',
      'Guide services',
      'Medical posts'
    ],
    interests: ['hiking', 'adventure']
  },
  {
    id: '9',
    name: 'Bhaktapur Durbar Square',
    region: 'Bhaktapur',
    category: 'cultural',
    description: 'Well-preserved ancient city with magnificent temples and palaces. Known for its pottery squares and traditional Newari culture.',
    images: [
      'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg',
      'https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg'
    ],
    coordinates: {
      latitude: 27.6710,
      longitude: 85.4295
    },
    rating: 4.7,
    duration: 'Half day',
    price: 'NPR 1500',
    hasAudioGuide: false,
    howToGetThere: '1 hour drive from Kathmandu',
    bestTimeToVisit: 'Morning hours',
    facilities: [
      'Museum',
      'Traditional restaurants',
      'Guided tours'
    ],
    interests: ['cultural', 'photography']
  },
  {
    id: '10',
    name: 'Rara Lake',
    region: 'Mugu',
    category: 'nature',
    description: 'Nepals largest lake located in remote northwestern region. Crystal clear waters surrounded by pine forests and snow-capped mountains.',
    images: [
      'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg',
      'https://images.pexels.com/photos/3225529/pexels-photo-3225529.jpeg'
    ],
    coordinates: {
      latitude: 29.5200,
      longitude: 82.0875
    },
    rating: 4.8,
    duration: '7-10 day trek',
    price: 'NPR 80,000+',
    hasAudioGuide: false,
    howToGetThere: 'Fly to Nepalgunj then Talcha Airport, then trek',
    bestTimeToVisit: 'April-May and September-October',
    facilities: [
      'Basic lodges',
      'Camping sites',
      'Park office'
    ],
    interests: ['nature', 'hiking']
  },
  {
    id: '11',
    name: 'Gosaikunda Lake',
    region: 'Langtang',
    category: 'hidden-trails',
    description: 'A sacred high-altitude lake surrounded by snow-capped peaks. Popular among both trekkers and pilgrims.',
    images: [
      'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg',
      'https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg'
    ],
    coordinates: {
      latitude: 28.0833,
      longitude: 85.4167
    },
    rating: 4.7,
    duration: '4-5 days',
    price: 'NPR 15,000+',
    hasAudioGuide: false,
    howToGetThere: 'Drive to Dhunche then trek for 2-3 days',
    bestTimeToVisit: 'March to May, September to November',
    facilities: ['Basic lodges', 'Camping sites', 'Tea houses'],
    interests: ['hiking', 'spiritual', 'nature']
  },
  {
    id: '12',
    name: 'Upper Mustang',
    region: 'Mustang',
    category: 'hidden-trails',
    description: 'A remote kingdom with Tibetan culture and dramatic desert landscapes.',
    images: [
      'https://images.pexels.com/photos/6650184/pexels-photo-6650184.jpeg',
      'https://images.pexels.com/photos/6650185/pexels-photo-6650185.jpeg'
    ],
    coordinates: {
      latitude: 29.1892,
      longitude: 83.9744
    },
    rating: 4.9,
    duration: '10-12 days',
    price: 'NPR 50,000+',
    hasAudioGuide: false,
    howToGetThere: 'Fly to Jomsom then trek or drive',
    bestTimeToVisit: 'March to October',
    facilities: ['Guesthouses', 'Homestays', 'Cultural sites'],
    interests: ['cultural', 'hiking', 'photography']
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

const CACHE_KEYS = {
  DESTINATIONS: 'destinations',
  CATEGORIES: 'categories',
  INTERESTS: 'interests'
};

const CACHE_EXPIRY = 1000 * 60 * 60; // 1 hour

async function getCachedData(key: string) {
  try {
    const cached = await AsyncStorage.getItem(key);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        return data;
      }
    }
    return null;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
}

async function setCachedData(key: string, data: any) {
  try {
    await AsyncStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now()
      })
    );
  } catch (error) {
    console.error('Cache write error:', error);
  }
}

export async function getCategories(): Promise<Category[]> {
  const cached = await getCachedData(CACHE_KEYS.CATEGORIES);
  if (cached) return cached;

  await new Promise(resolve => setTimeout(resolve, 100));
  await setCachedData(CACHE_KEYS.CATEGORIES, CATEGORIES);
  return CATEGORIES;
}

export async function getDestinationsByCategory(categoryId: string): Promise<Destination[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  if (categoryId === 'hidden-trails') {
    return DESTINATIONS.filter(dest => dest.category === 'hidden-trails');
  }
  return DESTINATIONS.filter(dest => dest.category === categoryId);
}

export async function getAllDestinations(): Promise<Destination[]> {
  const cached = await getCachedData(CACHE_KEYS.DESTINATIONS);
  if (cached) return cached;

  await new Promise(resolve => setTimeout(resolve, 300));
  await setCachedData(CACHE_KEYS.DESTINATIONS, DESTINATIONS);
  return DESTINATIONS;
}

export async function getDestinationById(id: string): Promise<Destination | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return DESTINATIONS.find(dest => dest.id === id) || null;
}

export async function getTopDestinations(): Promise<Destination[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return DESTINATIONS.slice(0, 4);
}

export async function getNearbyAttractions(latitude?: number, longitude?: number): Promise<Destination[]> {
  if (!latitude || !longitude) {
    return DESTINATIONS.slice(0, 5);
  }

  // Calculate distances and sort by proximity
  const destinationsWithDistance = DESTINATIONS.map(dest => {
    const distance = calculateDistance(
      latitude,
      longitude,
      dest.coordinates.latitude,
      dest.coordinates.longitude
    );
    return { ...dest, distance };
  });

  return destinationsWithDistance
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))
    .slice(0, 5);
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export async function getDestinationsByIds(ids: string[]): Promise<Destination[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return DESTINATIONS.filter(dest => ids.includes(dest.id));
}

export async function getInterests(): Promise<Interest[]> {
  const cached = await getCachedData(CACHE_KEYS.INTERESTS);
  if (cached) return cached;

  await new Promise(resolve => setTimeout(resolve, 100));
  await setCachedData(CACHE_KEYS.INTERESTS, INTERESTS);
  return INTERESTS;
}