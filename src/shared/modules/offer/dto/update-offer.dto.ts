import { RentType } from '../../../types/index.js';
import { City } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public date?: Date;
  public city?: City;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public rating?: number;
  public type?: RentType;
  public bedrooms?: number;
  public maxAdults?: number;
  public price?: number;
  public goods?: string[];
  public hostId?: string;
  public comments?: number;
  public latitude?: number;
  public longitude?: number;
}
