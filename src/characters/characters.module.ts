import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { charactersProviders } from "./characters.providers";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [CharactersController],
  providers: [CharactersService,...charactersProviders]
})
export class CharactersModule {}
