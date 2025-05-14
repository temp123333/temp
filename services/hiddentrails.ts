// hiddenTrail.ts

export interface Trail {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  difficulty: string;
  bestSeason: string;
  duration: string; // Can be days or hours
  elevationGain: string; // In meters or feet
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
    image: 'https://example.com/annapurna.jpg', // Replace with an actual image URL
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
    name: 'Makalu Base Camp',
    location: 'Makalu Region, Nepal',
    description: 'An off-the-beaten-path trek to the base camp of Makalu, the fifth-highest peak in the world, known for its remote and pristine environment.',
    image: 'https://example.com/makalu.jpg', // Replace with an actual image URL
    difficulty: 'Challenging',
    bestSeason: 'March to May, September to November',
    duration: '20-24 days',
    elevationGain: '5,250 meters (17,220 feet)',
    nearbyAttractions: ['Sherpani Col', 'Barun Valley', 'Makalu Glacier'],
    recommendedGear: ['Trekking poles', 'Ice axe', 'Crampons', 'Heavy-duty jacket'],
    trailType: 'Out-and-back',
  },
  {
    id: 3,
    name: 'Kanchenjunga Trek',
    location: 'Kanchenjunga Region, Nepal',
    description: 'A remote trek leading to the base of the world’s third-highest peak, offering breathtaking views of snow-capped mountains.',
    image: 'https://example.com/kanchenjunga.jpg', // Replace with an actual image URL
    difficulty: 'Challenging',
    bestSeason: 'March to May, September to November',
    duration: '18-22 days',
    elevationGain: '5,143 meters (16,873 feet)',
    nearbyAttractions: ['Yalung Glacier', 'Tashi Phuk Monastery'],
    recommendedGear: ['Waterproof jacket', 'Trekking boots', 'Thermal wear', 'Sun protection'],
    trailType: 'Point-to-point',
  },
  {
    id: 4,
    name: 'Dolpo Region Trek',
    
    location: 'Dolpo Region, Nepal',
    description: 'A remote and rugged trek to one of Nepal’s least explored areas, Dolpo, offering a glimpse of Tibetan culture and stunning landscapes.',
    image: 'https://example.com/dolpo.jpg', // Replace with an actual image URL
    difficulty: 'Challenging',
    bestSeason: 'April to October',
    duration: '18-24 days',
    elevationGain: '5,300 meters (17,388 feet)',
    nearbyAttractions: ['Shey Phoksundo Lake', 'Phoksundo Valley'],
    recommendedGear: ['Trekking poles', 'Sunglasses', 'Sleeping bag', 'Climbing gear'],
    trailType: 'Loop',
  },
  // Add more trails as needed
];
