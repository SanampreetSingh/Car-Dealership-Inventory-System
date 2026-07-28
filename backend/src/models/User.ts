import { Schema, model } from 'mongoose';

// 1. TypeScript Interface
export interface IUser {
  name: string;
  email: string;
  password: string; // Will store the hashed password
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// 2. Mongoose Schema definition
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // Indexed for fast login lookups
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user', // Defaults to standard user to prevent accidental admin creation
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// 3. Export Model
export const User = model<IUser>('User', userSchema);
export default User;