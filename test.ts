// test.ts
import mongoose from 'mongoose';
import connectDB from './dbConfig';
import { User } from './models/user.model';

const test = async () => {
  try {
    await connectDB();

    const newUser = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword',
    });

    await newUser.save();
    console.log('User created successfully:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await mongoose.connection.close();
  }
};

test();
