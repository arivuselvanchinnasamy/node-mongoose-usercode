// user.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Counter } from './counter.model';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  code: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    code: { type: String },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  try {
    const doc = this as IUser;

    // Check if the email is unique
    const existingUser = await mongoose.models.User.findOne({ email: doc.email });
    if (existingUser) {
      throw new Error(`User with email "${doc.email}" already exists`);
    }

    // Find the counter document and update the sequence
    const counter = await Counter.findOneAndUpdate(
      { collectionName: 'user' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    if (!counter) {
      throw new Error('Failed to get or create the counter document');
    }

    const newSeqNo = counter.seq;
    const targetedLength = 5;
    const padding = '0'.repeat(targetedLength - newSeqNo.toString().length);
    const result = padding + newSeqNo;

    doc.code = 'U' + result;
    next();
  } catch (error:any) {
    next(error);
  }
});

export const User = mongoose.model<IUser>('User', userSchema);
