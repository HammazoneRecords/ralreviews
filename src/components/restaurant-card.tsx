
"use client";

import type { Restaurant } from '@/lib/types';
import Image from 'next/image';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: () => void;
}

export function RestaurantCard({ restaurant, onSelect }: RestaurantCardProps) {
  const getScaleClass = () => {
    switch (restaurant.name) {
      case 'Krispy Kreme':
        return 'scale-[0.79] group-hover:scale-[0.88]';
      case 'Burger King':
        return 'scale-110 group-hover:scale-125';
      case 'Popeyes':
        return 'scale-125 group-hover:scale-[1.4]';
      case 'Little Caesar':
        return 'scale-[1.07] group-hover:scale-[1.15]';
      default:
        return 'group-hover:scale-105';
    }
  };

  return (
    <div
      onClick={onSelect}
      className="cursor-pointer group"
    >
        <div className="relative h-48 w-full">
          <Image
            src={restaurant.logo}
            alt={`${restaurant.name} logo`}
            layout="fill"
            objectFit="contain"
            className={`transition-transform duration-300 p-4 ${getScaleClass()}`}
            data-ai-hint={restaurant.data_ai_hint}
          />
        </div>
    </div>
  );
}
