import { UserData } from '../../../types/index.js';

export class CreateCityDto {
  public commentText: string;
  public commentRating: number;
  public commentAuthor: UserData;
}
