import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String},
  price: { type: String},
});

export interface Users extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
}
