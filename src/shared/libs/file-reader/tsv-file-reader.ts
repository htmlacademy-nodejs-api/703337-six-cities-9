
import { FileReader } from './file-reader.interface.js';
import { RentType, RentCardType, UserData, City } from './index.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(
    private readonly filename: string
  ) {
    super();
  }

  // private validateRawData(): void {
  //   if (! this.rawData) {
  //     throw new Error('File was not read');
  //   }
  // }

  // private parseRawDataToOffers(): RentCardType[] {
  //   return this.rawData
  //     .split('\n')
  //     .filter((row) => row.trim().length > 0)
  //     .map((line) => this.parseLineToOffer(line));
  // }

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

    const newType = type[0].toUpperCase() + type.slice(1);

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
      type: RentType[newType as 'Apartment' | 'Room' | 'Hotel' | 'House'],
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

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }
}
