import { Document } from "mongoose";

export interface User extends Document {
  readonly userId: string;
  readonly email: {
    type: String,
    unique: true
  }
  readonly password: string;
}
