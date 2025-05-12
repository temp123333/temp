import { Destination, Interest } from '@/types';

// Mock data for destinations
const destinations: Destination[] = [
  {
    id: 'dest001',
    name: 'Gosainkunda Lake',
    region: 'Langtang',
    category: 'trekking',
    description: 'Gosainkunda is a sacred alpine freshwater lake situated at an altitude of 4,380 meters in Langtang National Park. This pristine lake remains frozen for about six months during winter (December to March). According to Hindu mythology, Gosainkunda was created when Lord Shiva thrust his trident into the mountain to extract water to cool his throat after consuming poison during the churning of the ocean. The lake is part of a complex of 108 lakes in the area and is a significant pilgrimage site, especially during the Janai Purnima festival in August when thousands of devotees visit. The trek to Gosainkunda offers breathtaking views of Langtang Lirung (7,227m), Ganesh Himal, and other peaks. The area is rich in biodiversity with sightings of red pandas, Himalayan black bears, and various species of pheasants. The trail passes through lush rhododendron forests, traditional Tamang villages, and high alpine meadows.',
    images: [
      'https://images.pexels.com/photos/2698413/pexels-photo-2698413.jpeg',
      'https://images.unsplash.com/photo-1586433101004-bf9a443f4cc1', // Alternative image
      'https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg',
      'https://images.pexels.com/photos/3617453/pexels-photo-3617453.jpeg'
    ],
    coordinates: {
      latitude: 28.0817,
      longitude: 85.4146
    },
    rating: 4.8,
    duration: '5-7 days (round trip from Kathmandu)',
    price: '$300-500 (including guide and permits)',
    audioGuide: 'https://example.com/audio/gosainkunda',
    hasAudioGuide: true,
    howToGetThere: 'The journey begins with a 7-8 hour drive from Kathmandu to Dhunche (1,960m), the headquarters of Langtang National Park. From Dhunche, the trek passes through Thulo Syabru (2,210m) and Sing Gompa (3,330m) before reaching Gosainkunda. The trek can be extended to cross the challenging Laurebina Pass (4,610m) and descend to Helambu, making a circuit back to Kathmandu. Proper acclimatization is essential to avoid altitude sickness.',
    bestTimeToVisit: 'The best seasons are spring (March-May) when rhododendrons bloom and autumn (September-November) for clear mountain views. Summer monsoons (June-August) make trails slippery, while winter (December-February) brings extreme cold and snow.',
    facilities: ['Basic teahouses along the route', 'Camping options', 'National Park entry check post', 'First aid stations at major stops', 'Limited electricity and WiFi in lower villages'],
    interests: ['trekking', 'nature', 'spiritual', 'photography']
  },
  {
    id: 'dest002',
    name: 'Khaptad National Park',
    region: 'Far-Western',
    category: 'nature',
    description: 'Khaptad National Park, established in 1984, is a mystical and relatively unexplored protected area spanning 225 sq km in Nepal\'s far-western region at elevations between 1,400-3,300 meters. The park is named after Khaptad Baba, a revered Hindu sage who meditated here for 50 years. His ashram remains an important pilgrimage site. The park features a unique ecosystem with 22 open grasslands (patans), dense forests of fir, oak, and rhododendron, and over 300 species of medicinal herbs. Wildlife includes the Himalayan black bear, leopard, musk deer, and 270 bird species including the impeyan pheasant (Danphe), Nepal\'s national bird. The area is culturally significant for both Hindus and Buddhists, with several temples and stupas dotting the landscape. The tranquil environment makes it perfect for meditation and nature immersion.',
    images: [
      'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b', // Mountain meadow
      'https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg'
    ],
    coordinates: {
      latitude: 29.3864,
      longitude: 81.1231
    },
    rating: 4.6,
    duration: '5-7 days (including travel time)',
    price: '$200-400 (including permits and guide)',
    hasAudioGuide: false,
    howToGetThere: 'From Kathmandu, take a 1-hour flight to Dhangadhi (or 15-hour drive), then a 6-7 hour drive to Silgadhi (Doti). From Silgadhi, it\'s a 4-5 hour trek to the park headquarters at Khaptad. Alternatively, fly to Nepalgunj and then to Dipayal (STOL airstrip), followed by a jeep ride and shorter trek. The remote location requires careful planning and local guides.',
    bestTimeToVisit: 'March-June for rhododendron blooms and September-November for clear views. April-May is ideal for birdwatching. Winters (Dec-Feb) are cold with possible snow, while monsoons (July-Aug) make trails muddy.',
    facilities: ['Basic guesthouses at park headquarters', 'Camping facilities', 'Small eateries serving local food', 'Park information center', 'Limited medical facilities'],
    interests: ['nature', 'spiritual', 'hiking', 'birdwatching', 'botany']
  },
  {
    id: 'dest003',
    name: 'Lo Manthang',
    region: 'Upper Mustang',
    category: 'cultural',
    description: 'Lo Manthang, the medieval walled capital of the former Kingdom of Lo (Mustang), is a remarkably preserved Tibetan-style settlement at 3,840m in Nepal\'s rain-shadow region. Founded in 1380 by warrior-king Ame Pal, this "walled city of clay" remained isolated until 1992 when the area opened to limited tourism. The 6m-high walls enclose about 150 whitewashed houses, the 15th-century Thubchen Gompa (with exquisite murals), Jampa Lhakhang (the oldest monastery), and the four-story royal palace where the current Raja (king) still resides. The surrounding arid landscape features wind-sculpted cliffs, ancient cave dwellings (some dating back 3,000 years), and over 50 chortens (stupas) along the traditional salt trade route to Tibet. The unique culture blends Tibetan Buddhism with older Bon traditions. Mustang is renowned for its annual Tiji Festival (May/June), a three-day ritual dance drama celebrating the victory of good over evil.',
    images: [
      'https://images.pexels.com/photos/3617467/pexels-photo-3617467.jpeg',
      'https://images.unsplash.com/photo-1513415277900-a62401e19be4', // Tibetan architecture
      'https://images.pexels.com/photos/3617455/pexels-photo-3617455.jpeg'
    ],
    coordinates: {
      latitude: 29.1768,
      longitude: 83.9634
    },
    rating: 4.9,
    duration: '12-16 days (including restricted area permit days)',
    price: '$1,200-2,000 (including $500 permit for 10 days)',
    audioGuide: 'https://example.com/audio/lomanthang',
    hasAudioGuide: true,
    howToGetThere: 'Fly from Kathmandu to Pokhara (25min), then to Jomsom (20min). From Jomsom (2,720m), trek or jeep 3-4 days via Kagbeni (entry checkpoint), Chele, and Tangbe to Lo Manthang. The entire Upper Mustang trek takes 12-16 days round trip. Special permits must be arranged through registered trekking agencies. October has the clearest skies but cold nights.',
    bestTimeToVisit: 'May-October (avoiding July-August rains). May-June for Tiji Festival; September-October for harvest season. Winters are extremely cold with possible snow-blocked passes.',
    facilities: ['Basic lodges/teahouses', 'Homestays in villages', 'Satellite phones (no mobile network)', 'Solar power (limited electricity)', 'Small shops selling Tibetan artifacts'],
    interests: ['cultural', 'historical', 'photography', 'spiritual', 'adventure']
  },
  {
    id: 'dest004',
    name: 'Rara Lake',
    region: 'Mugu',
    category: 'nature',
    description: 'Rara Lake, Nepal\'s largest freshwater lake at 10.8 sq km, is the centerpiece of Rara National Park in the remote Mugu district. Situated at 2,990m, this pristine oval-shaped lake (5km long, 3km wide) reaches depths of 167m. Its crystal-clear blue waters reflect surrounding snow peaks (up to 4,000m) and dense coniferous forests of blue pine, black juniper, and Himalayan cypress. The park protects endangered species like red pandas, musk deer, and Himalayan black bears, along with 272 bird species including the colorful impeyan pheasant. The lake holds religious significance with a temple dedicated to Thakur Baba on its eastern shore. The area remains blissfully uncrowded, offering serene nature walks and boating (traditional wooden boats available). The nearby villages of Murma and Jhyari provide glimpses into traditional Thakuri and Tibetan-influenced cultures.',
    images: [
      'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
      'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d', // Lake reflection
      'https://images.pexels.com/photos/1029245/pexels-photo-1029245.jpeg'
    ],
    coordinates: {
      latitude: 29.4907,
      longitude: 82.0843
    },
    rating: 4.7,
    duration: '8-10 days (round trip from Kathmandu)',
    price: '$500-800 (including flights and permits)',
    hasAudioGuide: false,
    howToGetThere: 'Option 1: Fly Kathmandu-Nepalgunj-Jumla (2 flights), then 3-day trek via Sinja Valley (ancient Khasa Kingdom capital). Option 2: Fly Kathmandu-Nepalgunj-Talcha (Mugu), then 3-4 hour hike to Rara. Overland routes take 3+ days from Surkhet or Jumla. Roads are rough; flights weather-dependent. Best arranged through trekking agencies.',
    bestTimeToVisit: 'April-May for spring blooms and September-November for clear views. June-August sees rain; December-March has snow with temperatures below freezing. October offers spectacular autumn colors.',
    facilities: ['Basic lodges at Talcha and lakeside', 'Camping grounds', 'Park visitor center', 'Boating facilities', 'Limited supplies - bring essentials from Kathmandu'],
    interests: ['nature', 'trekking', 'photography', 'birdwatching', 'solitude']
  },
  {
    id: 'dest005',
    name: 'Panch Pokhari',
    region: 'Sindhupalchok',
    category: 'trekking',
    description: 'Panch Pokhari (Five Lakes) is a sacred high-altitude wetland complex at 4,100m in Sindhupalchok district, comprising five glacial lakes fed by Himalayan snowmelt. This important pilgrimage site hosts the Janai Purnima festival each August when thousands of Hindus gather for ritual baths. According to legend, the lakes were created when five Pandava brothers stopped here during their exile. The main lake is surrounded by stone cairns and prayer flags, with stunning views of Jugal Himal (6,000m+ peaks). The trek passes through Tamang and Sherpa villages, lush rhododendron forests, and alpine meadows with yaks grazing. The biodiversity includes Himalayan monals, blood pheasants, and medicinal herbs. The area remains relatively untouched by mass tourism, offering authentic cultural experiences and challenging hikes through less-traveled routes.',
    images: [
      'https://images.pexels.com/photos/7457987/pexels-photo-7457987.jpeg',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b', // Alpine meadow
      'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg'
    ],
    coordinates: {
      latitude: 27.9520,
      longitude: 85.7137
    },
    rating: 4.5,
    duration: '7-9 days (round trip from Kathmandu)',
    price: '$350-500 (including guide and permits)',
    hasAudioGuide: false,
    howToGetThere: 'Drive 5-6 hours from Kathmandu to Chautara (district HQ), then to Sarmathang (2,600m) via Melamchi. Trek 3-4 days through Bhotang, Nosyampati, and Tupi Danda to reach Panch Pokhari. An alternative route starts from Dolalghat. Requires camping gear as teahouses are very basic. Best visited with experienced guides familiar with the route.',
    bestTimeToVisit: 'March-May for spring flowers and September-November for clear mountain views. August is special for the festival but crowded. Winters are extremely cold with heavy snow; monsoons make trails slippery.',
    facilities: ['Basic homestays in villages', 'Camping required near lakes', 'No reliable electricity', 'Limited phone connectivity', 'Local guides available in Sarmathang'],
    interests: ['trekking', 'spiritual', 'nature', 'photography', 'cultural']
  },
  {
    id: 'dest006',
    name: 'Bardia National Park',
    region: 'Bardia',
    category: 'nature',
    description: 'Bardia National Park, Nepal\'s largest wilderness in the Terai (968 sq km), offers premier wildlife viewing with far fewer visitors than Chitwan. Established in 1988, it protects endangered species like Bengal tigers (estimated 50+), greater one-horned rhinoceros (30+), wild elephants, and Gangetic dolphins in the Karnali River. The park\'s sal forests, riverine grasslands, and oxbow lakes host over 400 bird species including Bengal florican and sarus crane. Unique activities include jungle walks (day/night), elephant-back safaris, canoe trips, and visits to Tharu indigenous villages with their distinctive mud-walled houses and stick dances. The Babai Valley extension provides even more remote wilderness experiences. Conservation success stories include tiger population growth and rhino reintroduction from Chitwan.',
    images: [
      'https://images.pexels.com/photos/1123771/pexels-photo-1123771.jpeg',
      'https://images.unsplash.com/photo-1504173010664-32509aeebb62', // Rhinoceros
      'https://images.pexels.com/photos/6056901/pexels-photo-6056901.jpeg'
    ],
    coordinates: {
      latitude: 28.3855,
      longitude: 81.4757
    },
    rating: 4.8,
    duration: '3-5 days (optimal wildlife viewing)',
    price: '$250-600 (depending on lodge standard)',
    audioGuide: 'https://example.com/audio/bardia',
    hasAudioGuide: true,
    howToGetThere: 'Option 1: Fly Kathmandu-Nepalgunj (1hr), then 2hr drive to park. Option 2: 15hr bus from Kathmandu or 7hr from Pokhara. The park entrance is at Thakurdwara. Most visitors stay at lodges near the park headquarters. Private vehicles recommended for flexibility on safari timings.',
    bestTimeToVisit: 'February-May (best for tiger sightings as animals congregate at water sources) and October-December (pleasant weather). June-September is hot and humid with possible flooding; January can be foggy in mornings.',
    facilities: ['Luxury jungle lodges to budget hotels', 'Restaurants serving local/international cuisine', 'Visitor center with wildlife exhibits', 'Elephant breeding center', 'Tharu cultural museum'],
    interests: ['wildlife', 'nature', 'adventure', 'birdwatching', 'cultural']
  },
  {
    id: 'dest007',
    name: 'Timal',
    region: 'Kavre',
    category: 'cultural',
    description: 'Timal is an emerging eco-tourism destination in Kavrepalanchok district, offering authentic Tamang culture amidst terraced hillsides (1,200-2,500m). This agricultural region produces organic coffee, cardamom, and seasonal vegetables. Visitors can stay in traditional homestays, participate in farming activities, and hike to viewpoints like Timal Danda (2,450m) for sunrise over Langtang, Gaurishankar, and Everest ranges. The area is dotted with Buddhist monasteries and Hindu shrines, including the sacred Timal Narayan Temple. Community-based tourism initiatives allow cultural exchanges through Tamang selo dance performances, local cuisine (millet bread, fermented bamboo shoots), and handicraft demonstrations. The gentle trails pass through pine forests, waterfalls, and traditional water mills, offering a peaceful alternative to Nepal\'s crowded trekking routes.',
    images: [
      'https://images.pexels.com/photos/3648269/pexels-photo-3648269.jpeg',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5', // Terraced fields
      'https://images.pexels.com/photos/3368055/pexels-photo-3368055.jpeg'
    ],
    coordinates: {
      latitude: 27.5833,
      longitude: 85.6333
    },
    rating: 4.3,
    duration: '2-4 days (from Kathmandu)',
    price: '$100-200 (including homestay and meals)',
    hasAudioGuide: false,
    howToGetThere: 'Drive 3hr from Kathmandu via Banepa-Dhulikhel road to Timal Bazaar (public buses available). The last section has steep, narrow roads. Homestays are scattered across villages like Dandagaun, Kharelthok, and Timal Danda. Local guides can arrange cultural activities and hikes. Best visited with private transport for flexibility.',
    bestTimeToVisit: 'Year-round destination. September-November for mountain views and harvest festivals; February-April for pleasant weather and flowers. Winters (Dec-Jan) are chilly but clear; monsoons (June-Aug) bring lush greenery but leeches.',
    facilities: ['Community homestays', 'Organic farm visits', 'Local guides', 'Basic shops in Timal Bazaar', 'Solar power in most homes'],
    interests: ['cultural', 'rural', 'hiking', 'agriculture', 'photography']
  },
  {
    id: 'dest008',
    name: 'Dolpa',
    region: 'Mid-Western',
    category: 'adventure',
    description: 'Dolpa, Nepal\'s largest district, is a remote Himalayan region preserving ancient Tibetan culture and pristine landscapes. Upper Dolpa (requiring special permits) features the stunning Phoksundo Lake (3,600m) - Nepal\'s deepest lake with turquoise waters and no aquatic life. The area is part of Shey Phoksundo National Park, protecting snow leopards, blue sheep, and Himalayan griffons. The medieval villages like Ringmo (with its pre-Buddhist Bon monasteries) and Shey Gompa (crystal monastery) follow traditions unchanged for centuries. The challenging Dolpa Circuit trek crosses high passes (up to 5,360m), passing through surreal landscapes of eroded cliffs, hidden valleys, and one of the world\'s highest inhabited villages (Tarakot at 2,800m). Peter Matthiessen\'s "The Snow Leopard" chronicled this mystical region.',
    images: [
      'https://images.pexels.com/photos/6852829/pexels-photo-6852829.jpeg',
      'https://images.unsplash.com/photo-1605540436563-5bca919ae766', // Tibetan village
      'https://images.pexels.com/photos/6852818/pexels-photo-6852818.jpeg'
    ],
    coordinates: {
      latitude: 29.0541,
      longitude: 83.0918
    },
    rating: 4.9,
    duration: '18-25 days (full circuit)',
    price: '$2,000-3,500 (including $500 permit for 10 days)',
    audioGuide: 'https://example.com/audio/dolpa',
    hasAudioGuide: true,
    howToGetThere: 'Fly Kathmandu-Nepalgunj-Juphal (2 flights). From Juphal (2,475m), trek 2 days to Dunai (district HQ), then 3 days to Phoksundo Lake. Upper Dolpa requires camping gear and experienced guides. The full circuit takes 3 weeks crossing Kang La (5,360m) and other high passes. September offers the most stable weather for high passes.',
    bestTimeToVisit: 'June-September (unlike most of Nepal) as Upper Dolpa lies in the rain-shadow. May-June sees locals migrating yaks to high pastures; July-August has traditional festivals. Winters are extremely harsh with temperatures below -20°C.',
    facilities: ['Camping only in Upper Dolpa', 'Basic teahouses in Lower Dolpa', 'No reliable electricity or WiFi', 'Satellite phones for emergencies', 'Limited supplies - must be self-sufficient'],
    interests: ['adventure', 'cultural', 'trekking', 'photography', 'wildlife']
  },
  {
    id: 'dest009',
    name: 'Kathmandu Valley',
    region: 'Central',
    category: 'cultural',
    description: 'The Kathmandu Valley, a UNESCO World Heritage Site, is Nepal\'s cultural heart with seven monument zones showcasing Newari architecture and living traditions. Key sites include: 1) Swayambhunath (Monkey Temple) - a 2,500-year-old stupa with panoramic views; 2) Boudhanath - the largest spherical stupa with Tibetan refugee community; 3) Pashupatinath - sacred Hindu temple complex on the Bagmati River; 4) Kathmandu Durbar Square - royal palaces and temples like Kumari Ghar (living goddess); 5) Patan Durbar Square - finest Newari craftsmanship; 6) Bhaktapur Durbar Square - best-preserved medieval city; 7) Changu Narayan - oldest Hindu temple (4th century). The valley blends Hindu and Buddhist traditions with vibrant festivals like Indra Jatra (September) and Bisket Jatra (April). Thamel offers tourist services while Ason bazaar provides authentic local experiences.',
    images: [
      'https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg',
      'https://images.unsplash.com/photo-1566438480900-0609be27a4be', // Boudhanath Stupa
      'https://images.pexels.com/photos/159203/kathmandu-nepal-architecture-temples-159203.jpeg',
    ],
    coordinates: {
      latitude: 27.7172,
      longitude: 85.3240
    },
    rating: 4.7,
    duration: '4-7 days (to explore major sites)',
    price: '$200-500 (depending on hotel standard)',
    audioGuide: 'https://example.com/audio/kathmandu',
    hasAudioGuide: true,
    howToGetThere: 'Tribhuvan International Airport (KTM) has direct flights from Asia/Middle East. Overland entry via India (Kakarbhitta/Sunauli) or Tibet (Kodari). Local transport includes taxis, ride-sharing, and tempo buses. Hiring a guide enhances understanding of complex cultural sites. UNESCO sites charge entry fees ($10-15 per site).',
    bestTimeToVisit: 'October-November (clear skies, festivals) and March-April (pleasant weather). December-February is chilly with haze; May-June is hot pre-monsoon; July-September has rain but lush landscapes.',
    facilities: ['Luxury hotels to budget hostels', 'International restaurants', 'Museums and cultural centers', 'Tour operators and guide services', 'Reliable mobile networks and WiFi'],
    interests: ['cultural', 'heritage', 'religious', 'urban', 'photography']
  },
  {
    id: 'dest010',
    name: 'Chitwan National Park',
    region: 'Central',
    category: 'wildlife',
    description: 'Chitwan National Park (932 sq km), Nepal\'s first UNESCO World Heritage Site (1984), protects the last remaining population of one-horned rhinoceros in Asia along with Bengal tigers, sloth bears, and over 500 bird species. The park\'s ecosystems include sal forests, riverine grasslands, and oxbow lakes formed by the Rapti and Narayani rivers. Unique activities include: 1) Jungle safaris (jeep/elephant-back) at dawn/dusk; 2) Canoe trips to spot gharial crocodiles; 3) Tharu cultural performances; 4) Elephant breeding center visits; 5) Nature walks with trained naturalists. The buffer zone has eco-lodges practicing sustainable tourism. Conservation success includes rhino population growth from <100 (1970s) to ~700 today through anti-poaching efforts.',
    images: [
      'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg',
      'https://images.unsplash.com/photo-1589656966895-2f33e7653819', // One-horned rhino
      'https://images.pexels.com/photos/45843/pexels-photo-45843.jpeg'
    ],
    coordinates: {
      latitude: 27.5086,
      longitude: 84.5290
    },
    rating: 4.8,
    duration: '2-4 days (optimal wildlife viewing)',
    price: '$200-600 (depending on lodge standard)',
    audioGuide: 'https://example.com/audio/chitwan',
    hasAudioGuide: true,
    howToGetThere: 'Option 1: 5hr drive from Kathmandu via Prithvi Highway. Option 2: 25min flight to Bharatpur then 30min drive. Most visitors stay in Sauraha (eastern edge) or Meghauli (western side). Park entry requires permits ($30/day) usually arranged by lodges. Early morning/late afternoon are best for wildlife activity.',
    bestTimeToVisit: 'October-March (pleasant 20-25°C days). February-April is best for birdwatching; May-June (up to 40°C) offers best tiger sightings as animals gather at water sources. July-September sees flooding in some areas.',
    facilities: ['Luxury jungle resorts to budget lodges', 'Swimming pools in upscale hotels', 'Museum and visitor center', 'Bicycle rentals', 'Tharu cultural dance venues'],
    interests: ['wildlife', 'nature', 'adventure', 'birdwatching', 'cultural']
  },
  {
    id: 'dest011',
    name: 'Nagarkot',
    region: 'Bhaktapur',
    category: 'nature',
    description: 'Nagarkot (2,175m), just 32km east of Kathmandu, is a premier hill station renowned for panoramic Himalayan views spanning from Dhaulagiri (8,167m) in the west to Everest (8,848m) in the east. The sunrise viewpoint offers breathtaking alpenglow on snow peaks with minimal light pollution. Developed as a royal retreat in the 1970s, it now features luxury resorts alongside traditional villages. Hiking trails connect to Changu Narayan temple (4hr walk through pine forests) or Sankhu (5hr). The area is particularly magical during autumn (October-November) when the Himalayas are clearest and winter (December-January) for possible snow dustings. Cyclists enjoy the winding mountain roads while artists frequent the quiet ambiance for creative work. The Nagarkot Tower provides 360° views on clear days.',
    images: [
      'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b', // Mountain panorama
      'https://images.pexels.com/photos/210188/pexels-photo-210188.jpeg'
    ],
    coordinates: {
      latitude: 27.6964,
      longitude: 85.5036
    },
    rating: 4.5,
    duration: '1-2 nights (optimal for sunrise viewing)',
    price: '$50-300 (depending on hotel)',
    hasAudioGuide: false,
    howToGetThere: '1.5-2hr drive from Kathmandu via Bhaktapur (private taxi $25-40). Public buses depart from Bhaktapur (1hr, $1). The road winds steeply uphill with many switchbacks. Many visitors combine with Bhaktapur sightseeing. No entry fees except for hotel stays.',
    bestTimeToVisit: 'October-April for clearest mountain views. September-November offers spectacular sunrise/sunset; December-February has crisp air but chilly nights. May-June is hazy; July-August has monsoon clouds.',
    facilities: ['Luxury resorts with mountain views', 'Restaurants serving local/continental', 'Hiking trail maps available', 'ATMs and small shops', 'Some hotels have spa services'],
    interests: ['nature', 'hiking', 'photography', 'relaxation', 'sunrise']
  },
  {
    id: 'dest012',
    name: 'Bandipur',
    region: 'Tanahun',
    category: 'cultural',
    description: 'Bandipur (1,030m), a preserved Newari trading town from the 18th century, offers a living museum experience with its flagstone streets, ornate windows, and traditional houses. This car-free hilltop settlement was a key stop on the India-Tibet trade route before the highway bypassed it, leaving its architecture frozen in time. Highlights include: 1) Tundikhel viewpoint for Himalayan sunsets; 2) Silk Farm demonstrating sericulture; 3) Siddha Cave (2hr hike) - Nepal\'s largest; 4) Bindabasini Temple with gold-plated roof; 5) Night walks to see fireflies (May-June). The local Newari culture thrives with festivals like Bisket Jatra (April) and daily rituals at the 17th-century Mahalaxmi Temple. Organic coffee plantations and homestays provide sustainable tourism options.',
    images: [
      'https://images.pexels.com/photos/210189/pexels-photo-210189.jpeg',
      'https://images.unsplash.com/photo-1605540436563-5bca919ae766', // Newari architecture
      'https://images.pexels.com/photos/210191/pexels-photo-210191.jpeg'
    ],
    coordinates: {
      latitude: 27.8954,
      longitude: 84.3740
    },
    rating: 4.6,
    duration: '2-3 days (including hikes)',
    price: '$60-200 (homestays to boutique hotels)',
    hasAudioGuide: false,
    howToGetThere: '3-4hr drive from Kathmandu (or 1.5hr from Pokhara) via Dumre. From Dumre Bazaar, a steep 8km road ascends to Bandipur (taxis available). Public buses run from Pokhara (2hr) and Kathmandu (4hr). The pedestrianized core requires walking; porters available for luggage.',
    bestTimeToVisit: 'September-November for clear mountain views and pleasant temperatures. February-April for spring flowers; December-January for crisp air. May-June is hot; July-August has monsoon rains.',
    facilities: ['Boutique heritage hotels', 'Newari cuisine restaurants', 'Visitor information center', 'Handicraft shops', 'Guided village walks available'],
    interests: ['cultural', 'heritage', 'photography', 'hiking', 'local_cuisine']
  }
];

// Mock data for interests
const interests: Interest[] = [
  {
    id: 'trekking',
    name: 'Trekking',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/trekking.png',
    description: 'Explore Nepal\'s legendary trekking routes from easy walks to challenging high-altitude adventures'
  },
  {
    id: 'cultural',
    name: 'Cultural',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/temple.png',
    description: 'Immerse in Nepal\'s living heritage of temples, festivals, and diverse ethnic traditions'
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/forest.png',
    description: 'Discover pristine landscapes from jungles to alpine lakes in Nepal\'s protected areas'
  },
  {
    id: 'adventure',
    name: 'Adventure',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/kayaking.png',
    description: 'Experience adrenaline activities from whitewater rafting to mountain flights'
  },
  {
    id: 'wildlife',
    name: 'Wildlife',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/elephant.png',
    description: 'Spot rare species like tigers, rhinos and red pandas in their natural habitats'
  },
  {
    id: 'spiritual',
    name: 'Spiritual',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/meditation-guru.png',
    description: 'Find peace at sacred sites blending Hindu and Buddhist traditions'
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/camera.png',
    description: 'Capture stunning landscapes, wildlife and cultural moments'
  },
  {
    id: 'historical',
    name: 'Historical',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/palace.png',
    description: 'Explore ancient palaces, trade routes and medieval architecture'
  },
  {
    id: 'birdwatching',
    name: 'Birdwatching',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/owl.png',
    description: 'Observe Nepal\'s 900+ bird species including rare endemics'
  },
  {
    id: 'local_cuisine',
    name: 'Local Cuisine',
    icon: 'https://img.icons8.com/ios-filled/50/1E40AF/meal.png',
    description: 'Savor authentic Newari, Thakali and Himalayan flavors'
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