#!/usr/bin/env node
import 'reflect-metadata';
import { CLIApplication, GenerateCommand, HelpCommand, VersionCommand, ImportCommand } from './cli/index.js';


function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand()
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();

//npm run ts ./src/main.cli.js -- --generate 10 ./mocks/mock-offers.tsv http://localhost:3123/api
