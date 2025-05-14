export interface Trail {
  id: number;
  name: string;
  location: string;
  description: string;
  imageUrl: string; // Changed from 'image' to 'imageUrl'
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
  // Add more trails with actual Pexels images
];