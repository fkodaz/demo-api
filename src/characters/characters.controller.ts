import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { CharactersService } from "./characters.service";

@Controller("characters")
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {
  }

  @Post()
  findAll(@Body() { name, gender, books, series, page }) {
    return this.charactersService.findAll({ name, gender, books, series, page });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.charactersService.findOne(id);
  }
}
