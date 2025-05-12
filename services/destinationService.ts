import { Destination, Interest } from '@/types';

// Mock data for destinations
const destinations: Destination[] = [
  {
    id: 'dest001',
    name: 'Gosainkunda Lake',
    region: 'Langtang',
    category: 'trekking',
    description: 'Gosainkunda is an alpine freshwater lake in Langtang National Park at an altitude of 4,380 m. The lake remains frozen for six months in winter. According to legend, Gosainkunda was created by Lord Shiva when he thrust his trishul (trident) into a mountain to extract water so that he could cool his stinging throat after swallowing poison.',
    images: [
      'https://images.pexels.com/photos/2698413/pexels-photo-2698413.jpeg',
      'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg',
      'https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg',
      'https://images.pexels.com/photos/3617453/pexels-photo-3617453.jpeg'
    ],
    coordinates: {
      latitude: 28.0817,
      longitude: 85.4146
    },
    rating: 4.8,
    duration: '3-4 days',
    price: '$200-300',
    audioGuide: 'https://example.com/audio/gosainkunda',
    hasAudioGuide: true,
    howToGetThere: 'From Kathmandu, take a bus to Dhunche (7-8 hours) and then trek for 2 days to reach Gosainkunda Lake. Alternatively, you can drive to Dhunche and hire a guide for the trek.',
    bestTimeToVisit: 'March to May and September to November are ideal for trekking to Gosainkunda. During these months, the weather is clear and offers spectacular views.',
    facilities: ['Teahouses', 'Guided Tours', 'Camping', 'Photography'],
    interests: ['trekking', 'nature', 'spiritual']
  },
  {
    id: 'dest002',
    name: 'Khaptad National Park',
    region: 'Far-Western',
    category: 'nature',
    description: 'Khaptad National Park is a hidden gem in the far-western region of Nepal. It offers a unique blend of natural beauty, biodiversity, and spiritual significance. The park is known for its beautiful meadows, diverse flora and fauna, and the ashram of Khaptad Baba, a revered sage who meditated here for decades.',
    images: [
      'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg',
      'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg',
      'https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg'
    ],
    coordinates: {
      latitude: 29.3864,
      longitude: 81.1231
    },
    rating: 4.6,
    duration: '4-5 days',
    price: '$150-250',
    hasAudioGuide: false,
    howToGetThere: 'From Kathmandu, fly to Dhangadhi and then drive to Silgadhi. From there, it\'s a day\'s trek to reach the park headquarters. You can also reach by taking a flight to Nepalgunj and then to Dipayal, followed by a jeep ride and trek.',
    bestTimeToVisit: 'March to June and September to November. In spring, you can witness beautiful rhododendron blooms, while autumn offers clear skies and pleasant temperatures.',
    facilities: ['Camping', 'Guided Tours', 'Basic Accommodations', 'Bird Watching'],
    interests: ['nature', 'spiritual', 'hiking']
  },
  {
    id: 'dest003',
    name: 'Lo Manthang',
    region: 'Upper Mustang',
    category: 'cultural',
    description: 'Lo Manthang is a walled city that served as the capital of the Kingdom of Lo from 1380 to 2008. This ancient walled settlement offers a glimpse into Tibetan culture and tradition with its monasteries, royal palace, and unique architecture. The surrounding landscape features dramatic cliffs and caves with ancient Buddhist paintings.',
    images: [
      'https://images.pexels.com/photos/3617467/pexels-photo-3617467.jpeg',
      'https://images.pexels.com/photos/3614948/pexels-photo-3614948.jpeg',
      'https://images.pexels.com/photos/3617455/pexels-photo-3617455.jpeg'
    ],
    coordinates: {
      latitude: 29.1768,
      longitude: 83.9634
    },
    rating: 4.9,
    duration: '10-14 days',
    price: '$1000-1500',
    audioGuide: 'https://example.com/audio/lomanthang',
    hasAudioGuide: true,
    howToGetThere: 'Take a flight from Kathmandu to Jomsom, then take a jeep or trek for 3-4 days to reach Lo Manthang. You need a special permit to visit Upper Mustang which costs $500 for 10 days.',
    bestTimeToVisit: 'May to October is the best time to visit as the weather is stable and dry. June is special for witnessing the Tiji Festival, a three-day ritual known as "the chasing of the demons".',
    facilities: ['Homestays', 'Teahouses', 'Guided Tours', 'Cultural Experiences'],
    interests: ['cultural', 'historical', 'photography']
  },
  {
    id: 'dest004',
    name: 'Rara Lake',
    region: 'Mugu',
    category: 'nature',
    description: 'Rara Lake is the largest lake in Nepal, situated at an altitude of 2,990 m within Rara National Park. The lake is surrounded by alpine forests and snow-capped peaks, creating a breathtaking landscape. The pristine blue waters of the lake reflect the surrounding hills, creating a picturesque setting often referred to as the "Queen of Lakes".',
    images: [
      'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
      'https://images.pexels.com/photos/1992990/pexels-photo-1992990.jpeg',
      'https://images.pexels.com/photos/1029245/pexels-photo-1029245.jpeg'
    ],
    coordinates: {
      latitude: 29.4907,
      longitude: 82.0843
    },
    rating: 4.7,
    duration: '7-9 days',
    price: '$400-600',
    hasAudioGuide: false,
    howToGetThere: 'Fly from Kathmandu to Nepalgunj, then to Jumla or Talcha. From there, it\'s a 2-3 day trek to Rara Lake. Alternatively, you can take a direct flight from Kathmandu to Talcha (when available) and then trek for about 3-4 hours.',
    bestTimeToVisit: 'April to June and September to November. Autumn offers clear views with pleasant temperatures, while spring brings lush green surroundings with wildflowers.',
    facilities: ['Camping', 'Basic Lodges', 'Boating', 'Fishing (with permit)'],
    interests: ['nature', 'trekking', 'photography']
  },
  {
    id: 'dest005',
    name: 'Panch Pokhari',
    region: 'Sindhupalchok',
    category: 'trekking',
    description: 'Panch Pokhari (Five Lakes) is a group of five holy lakes located at an altitude of 4,100 m in the Sindhupalchok district. This off-the-beaten-path destination offers stunning mountain views, unique cultural experiences, and religious significance. The area is considered sacred to both Hindus and Buddhists.',
    images: [
      'https://images.pexels.com/photos/7457987/pexels-photo-7457987.jpeg',
      'https://images.pexels.com/photos/3551359/pexels-photo-3551359.jpeg',
      'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg'
    ],
    coordinates: {
      latitude: 27.9520,
      longitude: 85.7137
    },
    rating: 4.5,
    duration: '6-7 days',
    price: '$300-400',
    hasAudioGuide: false,
    howToGetThere: 'From Kathmandu, take a bus to Chautara and continue to Sarmathang. From there, trek for 3-4 days to reach Panch Pokhari. The trek passes through beautiful villages, forests, and offers panoramic mountain views.',
    bestTimeToVisit: 'March to May and September to November. During the full moon of August, a festival is held at Panch Pokhari, attracting many pilgrims.',
    facilities: ['Camping', 'Teahouses (limited)', 'Local Guides'],
    interests: ['trekking', 'spiritual', 'nature']
  },
  {
    id: 'dest006',
    name: 'Bardia National Park',
    region: 'Bardia',
    category: 'nature',
    description: 'Bardia National Park is the largest and most undisturbed wilderness area in Nepal\'s Terai region. Less crowded than Chitwan, Bardia offers an authentic wildlife experience with chances to spot tigers, elephants, rhinos, and over 400 species of birds. The park is also home to the endangered Gangetic dolphin in the Karnali River.',
    images: [
      'https://images.pexels.com/photos/1123771/pexels-photo-1123771.jpeg',
      'https://images.pexels.com/photos/1108396/pexels-photo-1108396.jpeg',
      'https://images.pexels.com/photos/6056901/pexels-photo-6056901.jpeg'
    ],
    coordinates: {
      latitude: 28.3855,
      longitude: 81.4757
    },
    rating: 4.8,
    duration: '3-5 days',
    price: '$250-500',
    audioGuide: 'https://example.com/audio/bardia',
    hasAudioGuide: true,
    howToGetThere: 'Fly from Kathmandu to Nepalgunj, then take a 2-3 hour drive to Bardia. Alternatively, you can take a long bus journey from Kathmandu (15-16 hours).',
    bestTimeToVisit: 'February to June and October to December. March to June is excellent for wildlife viewing as animals gather around water sources. October to December offers pleasant weather and good visibility.',
    facilities: ['Jungle Lodges', 'Safari Tours', 'River Rafting', 'Cultural Programs'],
    interests: ['wildlife', 'nature', 'adventure']
  },
  {
    id: 'dest007',
    name: 'Timal',
    region: 'Kavre',
    category: 'cultural',
    description: 'Timal is a beautiful highland area in Kavre district, known for its terraced fields, traditional Tamang villages, and spiritual significance. This little-known region offers authentic cultural experiences, organic farming, and stunning views of the Himalayan range including Langtang and Gaurishankar.',
    images: [
      'https://images.pexels.com/photos/3648269/pexels-photo-3648269.jpeg',
      'https://images.pexels.com/photos/3214944/pexels-photo-3214944.jpeg',
      'https://images.pexels.com/photos/3368055/pexels-photo-3368055.jpeg'
    ],
    coordinates: {
      latitude: 27.5833,
      longitude: 85.6333
    },
    rating: 4.3,
    duration: '2-3 days',
    price: '$100-200',
    hasAudioGuide: false,
    howToGetThere: 'From Kathmandu, take a bus to Dhulikhel and then to Timal, which takes about 3-4 hours. You can also hire a private vehicle for a more comfortable journey.',
    bestTimeToVisit: 'Year-round, but October to March offers clear mountain views. During spring, the rhododendron blooms add to the beauty of the region.',
    facilities: ['Homestays', 'Community Treks', 'Cultural Experiences', 'Organic Farming'],
    interests: ['cultural', 'rural', 'hiking']
  },
  {
    id: 'dest008',
    name: 'Dolpa',
    region: 'Mid-Western',
    category: 'adventure',
    description: 'Dolpa is one of the most remote and least developed regions of Nepal, offering pristine natural beauty and rich Tibetan cultural heritage. Upper Dolpa requires a special permit and features Shey Phoksundo National Park with the stunning turquoise Phoksundo Lake. The region is known for its ancient Bon culture, monasteries, and dramatic landscapes.',
    images: [
      'https://images.pexels.com/photos/6852829/pexels-photo-6852829.jpeg',
      'https://images.pexels.com/photos/5241013/pexels-photo-5241013.jpeg',
      'https://images.pexels.com/photos/6852818/pexels-photo-6852818.jpeg'
    ],
    coordinates: {
      latitude: 29.0541,
      longitude: 83.0918
    },
    rating: 4.9,
    duration: '14-21 days',
    price: '$2000-3000',
    audioGuide: 'https://example.com/audio/dolpa',
    hasAudioGuide: true,
    howToGetThere: 'Fly from Kathmandu to Nepalgunj, then to Juphal. From Juphal, trek to Dunai and further into Upper Dolpa. Special permits are required for Upper Dolpa.',
    bestTimeToVisit: 'June to September, which is summer and early autumn. Unlike other parts of Nepal, this is the best time as the high passes are free of snow and accessible.',
    facilities: ['Camping', 'Basic Teahouses', 'Guided Expeditions'],
    interests: ['adventure', 'cultural', 'trekking']
  }
];

// Mock data for interests
const interests: Interest[] = [
  {
    id: 'trekking',
    name: 'Trekking',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/trekking.png'
  },
  {
    id: 'cultural',
    name: 'Cultural',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/temple.png'
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/forest.png'
  },
  {
    id: 'adventure',
    name: 'Adventure',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/kayaking.png'
  },
  {
    id: 'wildlife',
    name: 'Wildlife',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/elephant.png'
  },
  {
    id: 'spiritual',
    name: 'Spiritual',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/meditation-guru.png'
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/camera.png'
  },
  {
    id: 'historical',
    name: 'Historical',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/palace.png'
  }
];

// Simulated API calls with delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getTopDestinations = async (): Promise<Destination[]> => {
  await delay(1000);
  return destinations.slice(0, 5);
};

export const getNearbyAttractions = async (): Promise<Destination[]> => {
  await delay(800);
  return destinations.slice(3, 8);
};

export const getAllDestinations = async (): Promise<Destination[]> => {
  await delay(1200);
  return destinations;
};

export const getDestinationById = async (id: string): Promise<Destination | null> => {
  await delay(800);
  const destination = destinations.find(dest => dest.id === id);
  return destination || null;
};

export const getDestinationsByIds = async (ids: string[]): Promise<Destination[]> => {
  await delay(1000);
  return destinations.filter(dest => ids.includes(dest.id));
};

export const getInterests = async (): Promise<Interest[]> => {
  await delay(500);
  return interests;
};