export interface Trail {
  id: number;
  name: string;
  location: string;
  description: string;
  images: string[];
  difficulty: string;
  bestSeason: string;
  duration: string;
  elevationGain: string;
  nearbyAttractions: string[];
  recommendedGear: string[];
  trailType: string;
  highlights: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export const hiddenTrails: Trail[] = [
  {
    id: 1,
    name: 'Annapurna Circuit',
    location: 'Annapurna Region, Nepal',
    description: 'The Annapurna Circuit is one of the most diverse and spectacular treks in Nepal, offering an incredible journey through dramatic deep valleys and high mountains. This trek encircles the Annapurna massif, crossing Thorong La Pass (5,416m), and showcases the region\'s cultural and geographical diversity.',
    images: [
      'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg',
      'https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg',
      'https://images.pexels.com/photos/4215110/pexels-photo-4215110.jpeg',
      'https://images.pexels.com/photos/4215104/pexels-photo-4215104.jpeg'
    ],
    difficulty: 'Challenging',
    bestSeason: 'March to May, September to November',
    duration: '15-20 days',
    elevationGain: '5,416m at highest point',
    nearbyAttractions: [
      'Poon Hill Viewpoint',
      'Muktinath Temple',
      'Marpha Village',
      'Tilicho Lake',
      'Hot Springs at Tatopani'
    ],
    recommendedGear: [
      'Four-season sleeping bag',
      'Down jacket',
      'Trekking poles',
      'Altitude sickness medication',
      'Water purification system',
      'Sturdy hiking boots',
      'Thermal layers'
    ],
    trailType: 'Circuit Trek',
    highlights: [
      'Cross the challenging Thorong La Pass at 5,416m',
      'Experience diverse landscapes from subtropical to alpine',
      'Visit traditional Hindu and Buddhist villages',
      'Witness stunning sunrise over the Annapurna range',
      'Explore the deepest gorge in the world - Kali Gandaki'
    ],
    coordinates: {
      latitude: 28.5971,
      longitude: 83.9574
    }
  },
  {
    id: 2,
    name: 'Upper Mustang Trek',
    location: 'Mustang Region, Nepal',
    description: 'The Upper Mustang trek is a rare privilege into the hidden world of the old Buddhist kingdom of Lo. This remote region preserves some of the last vestiges of traditional Tibetan Buddhist culture.',
    images: [
      'https://images.pexels.com/photos/6650184/pexels-photo-6650184.jpeg',
      'https://images.pexels.com/photos/6650161/pexels-photo-6650161.jpeg',
      'https://images.pexels.com/photos/6650138/pexels-photo-6650138.jpeg',
      'https://images.pexels.com/photos/6650141/pexels-photo-6650141.jpeg'
    ],
    difficulty: 'Challenging',
    bestSeason: 'March to November',
    duration: '12-14 days',
    elevationGain: '3,800m average altitude',
    nearbyAttractions: [
      'Lo Manthang Medieval City',
      'Chhoser Cave Monastery',
      'Lomanthang Palace',
      'Ghami Village',
      'Ghar Gompa (House of God)'
    ],
    recommendedGear: [
      'UV protection gear',
      'Windproof jacket',
      'Dust masks',
      'Trekking boots',
      'Walking poles',
      'Sleeping bag',
      'Headlamp'
    ],
    trailType: 'Cultural Trek',
    highlights: [
      'Explore the medieval walled city of Lo Manthang',
      'Visit ancient monasteries and cave dwellings',
      'Witness unique Tibetan Buddhist culture',
      'See dramatic desert landscapes and cliffs',
      'Experience traditional Mustangi lifestyle'
    ],
    coordinates: {
      latitude: 29.1892,
      longitude: 83.9744
    }
  },
  {
    id: 3,
    name: 'Manaslu Circuit',
    location: 'Manaslu Region, Nepal',
    description: 'The Manaslu Circuit trek offers a unique adventure around the eighth highest mountain (8,163m). This trek is known for its outstanding beauty and cultural diversity.',
    images: [
      'https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg',
      'https://images.pexels.com/photos/4215110/pexels-photo-4215110.jpeg',
      'https://images.pexels.com/photos/4215104/pexels-photo-4215104.jpeg',
      'https://images.pexels.com/photos/4215100/pexels-photo-4215100.jpeg'
    ],
    difficulty: 'Strenuous',
    bestSeason: 'March to May, September to November',
    duration: '14-16 days',
    elevationGain: '5,160m at Larkya La Pass',
    nearbyAttractions: [
      'Larkya La Pass',
      'Birendra Lake',
      'Sama Gaon Village',
      'Pungen Glacier',
      'Ribung Gompa'
    ],
    recommendedGear: [
      'High-altitude sleeping bag',
      'Crampons',
      'Ice axe',
      'Altitude medication',
      'Down jacket',
      'GPS device',
      'Emergency shelter'
    ],
    trailType: 'Circuit Trek',
    highlights: [
      'Cross the challenging Larkya La Pass',
      'View the majestic Mount Manaslu',
      'Experience authentic Tibetan culture',
      'Visit remote Buddhist monasteries',
      'Witness diverse flora and fauna'
    ],
    coordinates: {
      latitude: 28.5497,
      longitude: 84.5597
    }
  },
  {
    id: 4,
    name: 'Langtang Valley Trek',
    location: 'Langtang Region, Nepal',
    description: 'The Langtang Valley, known as the valley of glaciers, offers a spectacular trek through diverse landscapes and rich cultural heritage.',
    images: [
      'https://images.pexels.com/photos/2901215/pexels-photo-2901215.jpeg',
      'https://images.pexels.com/photos/2901214/pexels-photo-2901214.jpeg',
      'https://images.pexels.com/photos/2901213/pexels-photo-2901213.jpeg',
      'https://images.pexels.com/photos/2901212/pexels-photo-2901212.jpeg'
    ],
    difficulty: 'Moderate',
    bestSeason: 'October to May',
    duration: '7-10 days',
    elevationGain: '3,800m at highest point',
    nearbyAttractions: [
      'Kyanjin Gompa',
      'Langtang Village',
      'Tserko Ri',
      'Yak Cheese Factory',
      'Langtang National Park'
    ],
    recommendedGear: [
      'Trekking boots',
      'Warm sleeping bag',
      'Rain gear',
      'Trekking poles',
      'First aid kit',
      'Water bottles',
      'Sun protection'
    ],
    trailType: 'Valley Trek',
    highlights: [
      'Visit the historic Kyanjin Gompa',
      'Witness stunning mountain panoramas',
      'Experience local Tamang culture',
      'See rare wildlife in their natural habitat',
      'Taste authentic yak cheese'
    ],
    coordinates: {
      latitude: 28.2139,
      longitude: 85.5233
    }
  },
  {
  id: 5,
  name: 'Everest Base Camp Trek',
  location: 'Khumbu Region, Nepal',
  description: `The Everest Base Camp Trek is one of the most iconic and challenging treks in the world, offering breathtaking views of Mount Everest and the surrounding Himalayan peaks. This trek takes you through Sherpa villages, Buddhist monasteries, and stunning landscapes.`,
  images: [
    'https://images.pexels.com/photos/4170740/pexels-photo-4170740.jpeg',
    'https://images.pexels.com/photos/4170737/pexels-photo-4170737.jpeg',
    'https://images.pexels.com/photos/4170739/pexels-photo-4170739.jpeg',
    'https://images.pexels.com/photos/4170738/pexels-photo-4170738.jpeg'
  ],
  difficulty: 'Challenging',
  bestSeason: 'March to May, September to November',
  duration: '12-14 days',
  elevationGain: '5,364m at highest point',
  nearbyAttractions: [
    'Kala Patthar',
    'Namche Bazaar',
    'Tengboche Monastery',
    'Sagarmatha National Park',
    'Khumbu Glacier'
  ],
  recommendedGear: [
    'Warm clothing',
    'Trekking boots',
    'Sleeping bag rated for cold',
    'Trekking poles',
    'Altitude sickness medication',
    'Sunglasses and sunscreen'
  ],
  trailType: 'High-altitude Trek',
  highlights: [
    'Spectacular views of Mount Everest',
    'Visit Sherpa culture and monasteries',
    'Trek through Sagarmatha National Park',
    'Witness stunning sunrise at Kala Patthar',
    'Experience the thrill of high-altitude trekking'
  ],
  coordinates: {
    latitude: 27.9881,
    longitude: 86.9250
  }
}

];