import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  userId: String,
  email: String,
  password: String
});
