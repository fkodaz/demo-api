import { Document } from "mongoose";

export interface Character extends Document {
  readonly Id: string;
  readonly Name: string;
}
