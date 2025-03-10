import 'reflect-metadata';
import { RestApplication } from './rest/index.js';
import { Container } from 'inversify';

import { Component } from './shared/types/index.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createCityContainer } from './shared/modules/city/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createCityContainer(),
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();

// docker compose \
// --file ./docker-compose.dev.yml \
// --env-file ./.env \
// --project-name "six-cities" \
// up -d
