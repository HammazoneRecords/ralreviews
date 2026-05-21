
import type { Restaurant } from './types';

export const mockRestaurants: Omit<Restaurant, 'averageSentiment'>[] = [
  {
    id: '1',
    name: 'Burger King',
    logo: '/logos/burger-king.svg',
    data_ai_hint: 'burger joint',
    feedback: [],
  },
  {
    id: '2',
    name: 'Little Caesar',
    logo: '/logos/little-caesars.png',
    data_ai_hint: 'pizza place',
    feedback: [],
  },
  {
    id: '3',
    name: 'Popeyes',
    logo: '/logos/popeyes.svg',
    data_ai_hint: 'chicken restaurant',
    feedback: [],
  },
  {
    id: '4',
    name: 'Krispy Kreme',
    logo: '/logos/krispy-kreme.svg',
    data_ai_hint: 'donut shop',
    feedback: [],
  },
];
