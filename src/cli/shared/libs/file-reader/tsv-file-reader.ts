import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { RentType } from '../../types/rent-type.enum.js';
import { RentCardType } from '../../types/rent-card-type.js';
import { UserData } from '../../types/user-data.js';
import { City } from '../../types/city.js';


export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  private validateRawData(): void {
    if (! this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): RentCardType[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): RentCardType {
    const [
      id,
      title,
      description,
      date,
      cityName,
      locationLatitude,
      locationLongitude,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      hostName,
      hostEmail,
      hostAvatarUrl,
      hostPassword,
      hostisPro,
      comments,
      rentLocationLatitude,
      rentLocationLongitude,
    ] = line.split('\t');

    return {
      id,
      title,
      description,
      date: new Date(date),
      city: this.parseCity(cityName, locationLatitude, locationLongitude),
      previewImage,
      images: this.parseImages(images),
      isPremium: Boolean(isPremium),
      isFavorite: Boolean(isFavorite),
      rating: Number(rating),
      type: RentType[type as 'Room' | 'Apartment'],
      bedrooms: Number(bedrooms),
      maxAdults: Number(maxAdults),
      price: this.parsePrice(price),
      goods: this.parseImages(goods),
      host: this.parseUser(hostName, hostEmail, hostAvatarUrl, hostPassword, hostisPro),
      comments: Number(comments),
      location:{
        latitude: Number(rentLocationLatitude),
        longitude: Number(rentLocationLongitude),
      }
    };
  }

  private parseImages(imagesString: string): string [] {
    return imagesString.split(';').map((name) => name);
  }

  private parsePrice(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  private parseCity(cityName: string, locationLatitude: string, locationLongitude: string): City {
    return {
      name: cityName,
      location: {
        latitude: Number(locationLatitude),
        longitude: Number(locationLongitude),
      }
    };
  }

  private parseUser(hostName: string, hostEmail: string, hostAvatarUrl: string, hostPassword: string, hostisPro: string): UserData {
    return { name: hostName, email: hostEmail, avatarUrl: hostAvatarUrl, password: hostPassword, isPro: Boolean(hostisPro) };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): RentCardType[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
