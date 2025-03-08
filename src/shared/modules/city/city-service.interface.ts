import {DocumentType} from '@typegoose/typegoose';
import { CreateCityDto } from './dto/create-city.dto.js';
import { CityEntity } from './city.entity.js';

export interface CityService {
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  findByCityId(cityId: string): Promise<DocumentType<CityEntity> | null>;
  findByCityName(categoryName: string): Promise<DocumentType<CityEntity> | null>;
  findByCityNameOrCreate(categoryName: string, dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
}
