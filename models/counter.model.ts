import mongoose, { Schema, Document } from 'mongoose';

export interface ICounter extends Document {
  seq: number;
  collectionName: string;
}

const counterSchema: Schema<ICounter> = new Schema({
  seq: { type: Number, required: true },
  collectionName: { type: String, required: true, unique: true },
});

export const Counter = mongoose.model<ICounter>('Counter', counterSchema);
