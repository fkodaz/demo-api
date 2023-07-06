import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Character } from "./interfaces/character.interface";
import { ObjectId } from "mongodb";

@Injectable()
export class CharactersService {

  constructor(
    @Inject("CHARACTER_MODEL")
    private characterModel: Model<Character>
  ) {
  }

  async findAll({ name, gender, books, series, page = 1 }) {

    const limit = 12;
    const filter: any = {};

    if (name) {
      filter.Name = { "$regex": name, "$options": "i" };
    } else {
      filter.Name = /.{2}/;
    }

    if (books?.length > 0) {
      filter.Books = { "$all": books };
    }

    if (gender !== null) {
      filter.IsFemale = gender;
    }

    if (series?.length > 0) {
      filter.TvSeries = { "$all": series };
    }

    const findQuery = this.characterModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const results = await findQuery;

    const count = await this.characterModel.find(filter).count();

    return {
      results, totalSize: count
    };
  }


  findOne(id: string) {
    return this.characterModel.findOne(new ObjectId(id));
  }
}
