export interface Trail {
  id: number;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  difficulty: string;
  bestSeason: string;
  duration: string;
  elevationGain: string;
  nearbyAttractions: string[];
  recommendedGear: string[];
  trailType: string;
}

export const hiddenTrails: Trail[] = [
  {
    id: 1,
    name: 'Annapurna Circuit',
    location: 'Annapurna Region, Nepal',
    description: 'The Annapurna Circuit is one of the most diverse and spectacular treks in Nepal, offering an incredible journey through dramatic deep valleys and high mountains. This trek encircles the Annapurna massif, crossing Thorong La Pass (5,416m), and showcases the region\'s cultural and geographical diversity. You will pass through subtropical jungle, arid cliffs reminiscent of Tibet, and the deepest gorge in the world - the Kali Gandaki. The trail takes you through traditional Hindu villages in the lower regions and Buddhist settlements in the upper portions, offering unique cultural insights.',
    imageUrl: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg',
    difficulty: 'Moderate to Challenging',
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
    trailType: 'Circuit Trek'
  },
  {
    id: 2,
    name: 'Upper Mustang Trek',
    location: 'Mustang Region, Nepal',
    description: 'The Upper Mustang trek is a rare privilege into the hidden world of the old Buddhist kingdom of Lo. This remote region preserves some of the last vestiges of traditional Tibetan Buddhist culture. Trekking here means exploring countless ancient monasteries, caves, local villages and traditional Tibetan Buddhist culture. The landscape is a trans-Himalayan desert with colorful rock formations, deep ravines and snow-capped peaks. The trek passes through high altitude deserts, narrow canyons, eroded cliffs and moraine valleys. The medieval capital Lo-Manthang, a UNESCO World Heritage Site, houses remarkable 14th-century monasteries and royal palaces.',
    imageUrl: 'https://images.pexels.com/photos/6650184/pexels-photo-6650184.jpeg',
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
    trailType: 'Cultural Trek'
  },
  {
    id: 3,
    name: 'Manaslu Circuit',
    location: 'Manaslu Region, Nepal',
    description: 'The Manaslu Circuit trek offers a unique adventure around the eighth highest mountain (8,163m). This trek is known for its outstanding beauty and cultural diversity. The trail follows the ancient salt-trading route along the Budhi Gandaki River, through subtropical forests, traditional villages, and high alpine terrain. The trek crosses the challenging Larkya La Pass (5,160m), offering spectacular views of Manaslu, Himlung Himal, Cheo Himal, and Annapurna II. The region is rich in biodiversity and showcases a blend of Hindu and Tibetan-style Buddhist culture.',
    imageUrl: 'https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg',
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
    trailType: 'Circuit Trek'
  },
  {
    id: 4,
    name: 'Langtang Valley Trek',
    location: 'Langtang Region, Nepal',
    description: 'The Langtang Valley, known as the valley of glaciers, offers a spectacular trek through diverse landscapes and rich cultural heritage. The trail follows the Langtang River through forests of rhododendron and bamboo, past yak pastures and traditional Tamang villages. The valley is surrounded by snow-capped peaks and offers close views of Langtang Lirung (7,227m). The trek also visits the famous Kyanjin Gompa and offers optional climbs to Kyanjin Ri or Tserko Ri for panoramic mountain views.',
    imageUrl: 'https://images.pexels.com/photos/2901215/pexels-photo-2901215.jpeg',
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
    trailType: 'Valley Trek'
  }
];