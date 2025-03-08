import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { Component } from '../../types/index.js';
import { CityService } from './city-service.interface.js';
import { CityEntity, CityModel } from './city.entity.js';
import { DefaultCityService } from './city.service.js';

export function createCityContainer() {
  const categoryContainer = new Container();

  categoryContainer.bind<CityService>(Component.CityService).to(DefaultCityService);
  categoryContainer.bind<types.ModelType<CityEntity>>(Component.CityModel).toConstantValue(CityModel);

  return categoryContainer;
}
