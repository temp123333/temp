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
    description: 'A diverse trek offering scenic views of the Annapurna mountain range, passing through subtropical forests and traditional villages.',
    imageUrl: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg',
    difficulty: 'Moderate to Challenging',
    bestSeason: 'March to May, September to November',
    duration: '15-20 days',
    elevationGain: '5,416 meters (17,769 feet)',
    nearbyAttractions: ['Poon Hill', 'Besisahar', 'Manang Valley'],
    recommendedGear: ['Trekking boots', 'Backpack', 'Sleeping bag', 'Warm clothes'],
    trailType: 'Circuit',
  },
  {
    id: 2,
    name: 'Upper Mustang Trek',
    location: 'Mustang Region, Nepal',
    description: 'Journey through the ancient kingdom of Lo, featuring dramatic landscapes, cave monasteries, and preserved Tibetan culture.',
    imageUrl: 'https://images.pexels.com/photos/6650184/pexels-photo-6650184.jpeg',
    difficulty: 'Challenging',
    bestSeason: 'March to November',
    duration: '12-14 days',
    elevationGain: '4,380 meters (14,370 feet)',
    nearbyAttractions: ['Lo Manthang', 'Chhoser Caves', 'Muktinath Temple'],
    recommendedGear: ['Trekking poles', 'Sun protection', 'Windproof jacket', 'Hiking boots'],
    trailType: 'Out and back',
  },
  {
    id: 3,
    name: 'Manaslu Circuit',
    location: 'Manaslu Region, Nepal',
    description: 'A remote trek around the world\'s eighth highest peak, offering pristine mountain views and authentic village experiences.',
    imageUrl: 'https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg',
    difficulty: 'Strenuous',
    bestSeason: 'March to May, September to November',
    duration: '14-16 days',
    elevationGain: '5,213 meters (17,103 feet)',
    nearbyAttractions: ['Larkya La Pass', 'Birendra Lake', 'Sama Gaon'],
    recommendedGear: ['Crampons', 'Ice axe', 'Altitude medication', 'Down jacket'],
    trailType: 'Circuit',
  }
];