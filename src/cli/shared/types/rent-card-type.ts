import { UserData } from './user-data.js';
import { City } from './city.js';
import { RentType } from './rent-type.enum.js';

export type RentCardType = {
  id: string;
  title: string;
  description: string;
  date: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: RentType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: UserData;
  comments: number;
  location: {
    latitude: number;
    longitude: number;
  };
}

export type RentCardsType = RentCardType[];
