import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { RentType } from '../../types/rent-type.enum.js';

import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/common.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const id = getRandomItem<string>(this.mockData.id);
    const title = getRandomItem<string>(this.mockData.title);
    const description = getRandomItem<string>(this.mockData.description);
    const name = getRandomItem<string>(this.mockData.name);
    const latitude = getRandomItem<number>(this.mockData.latitude);
    const longitude = getRandomItem<number>(this.mockData.longitude);
    const previewImage = getRandomItem<string>(this.mockData.previewImage);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomItem<boolean>(this.mockData.isPremium);
    const isFavorite = getRandomItem<boolean>(this.mockData.isFavorite);
    const rating = getRandomItem<number>(this.mockData.rating);
    const type = getRandomItem([RentType.Apartment, RentType.Hotel, RentType.House, RentType.Room]);
    const bedroom = getRandomItem<number>(this.mockData.bedrooms);
    const maxAdults = getRandomItem<number>(this.mockData.maxAdults);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(';');

    const author = getRandomItem(this.mockData.nameHost);
    const email = getRandomItem(this.mockData.email);
    const avatar = getRandomItem(this.mockData.avatarUrl);
    const passw = getRandomItem(this.mockData.password);
    const profy = getRandomItem(this.mockData.isPro);
    const comments = getRandomItem(this.mockData.comments);
    const latitudeCard = getRandomItem<number>(this.mockData.latitudeCard);
    const longitudeCard = getRandomItem<number>(this.mockData.longitudeCard);

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      id, title, description, createdDate, name, latitude, longitude, previewImage, images, isPremium, isFavorite, rating, type,
      bedroom, maxAdults, price, goods, author, email, avatar,
      profy, passw, comments, latitudeCard, longitudeCard
    ].join('\t');
  }
}

