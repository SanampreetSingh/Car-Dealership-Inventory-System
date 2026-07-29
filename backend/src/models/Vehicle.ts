import { Schema, model } from 'mongoose';

// 1. TypeScript Interface for type safety across your app
export interface IVehicle  {
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
  year?: number;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Mongoose Schema definition
const vehicleSchema = new Schema<IVehicle>(
  {
    make: {
      type: String,
      required: [true, 'Vehicle make is required'],
      trim: true,
      index: true, // Indexed for fast filtering
    },
    model: {
      type: String,
      required: [true, 'Vehicle model is required'],
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback', 'EV', 'Convertible', 'Other'],
      index: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
      index: true, // Indexed for price range queries ($gte, $lte)
    },
    quantity: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 1,
    },
    year: {
      type: Number,
      min: [1900, 'Year must be valid'],
      max: [new Date().getFullYear() + 1, 'Year cannot be in the far future'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: '',
      required: false,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// 3. Export Model
export const Vehicle = model<IVehicle>('Vehicle', vehicleSchema);
export default Vehicle;