
import type { Restaurant } from './types';

export const mockRestaurants: Omit<Restaurant, 'averageSentiment'>[] = [
  {
    id: '1',
    name: 'Burger King',
    logo: 'https://firebasestorage.googleapis.com/v0/b/ralfeedback.firebasestorage.app/o/img%2FBurger_King-Logo.wine.png?alt=media&token=f2234769-1777-4d44-97e5-99074b2c16c5',
    data_ai_hint: 'burger joint',
    feedback: [],
  },
  {
    id: '2',
    name: 'Little Caesar',
    logo: 'https://firebasestorage.googleapis.com/v0/b/ralfeedback.firebasestorage.app/o/img%2Flittle-caesars-pizza-seeklogo.png?alt=media&token=1a3a8bd3-7fa0-4b0f-ac90-76104365f9d5',
    data_ai_hint: 'pizza place',
    feedback: [],
  },
  {
    id: '3',
    name: 'Popeyes',
    logo: 'https://firebasestorage.googleapis.com/v0/b/ralfeedback.firebasestorage.app/o/img%2FPopeyes-Logo.wine.png?alt=media&token=7c4097fa-1cad-4bd0-9b73-580c6c8621c0',
    data_ai_hint: 'chicken restaurant',
    feedback: [],
  },
  {
    id: '4',
    name: 'Krispy Kreme',
    logo: 'https://firebasestorage.googleapis.com/v0/b/ralfeedback.firebasestorage.app/o/img%2F584fcb3f6a5ae41a83ddee87.png?alt=media&token=8d1cb15e-a73e-460a-83a0-08295f1a6410',
    data_ai_hint: 'donut shop',
    feedback: [],
  },
];
