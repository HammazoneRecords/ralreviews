
import type { Restaurant } from './types';

export const mockRestaurants: Omit<Restaurant, 'averageSentiment'>[] = [
  {
    id: '1',
    name: 'Burger King',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Burger_King_logo_%282005%E2%80%932012%29.svg',
    data_ai_hint: 'burger joint',
    feedback: [],
  },
  {
    id: '2',
    name: 'Little Caesar',
    logo: 'https://1000logos.net/wp-content/uploads/2023/04/Little-Caesars-Logo.png',
    data_ai_hint: 'pizza place',
    feedback: [],
  },
  {
    id: '3',
    name: 'Popeyes',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Popeyes_logo.svg',
    data_ai_hint: 'chicken restaurant',
    feedback: [],
  },
  {
    id: '4',
    name: 'Krispy Kreme',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Krispy_Kreme_logo.svg',
    data_ai_hint: 'donut shop',
    feedback: [],
  },
];
