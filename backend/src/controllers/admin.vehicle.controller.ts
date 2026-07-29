import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Vehicle from '../models/Vehicle';

// CREATE Vehicle
export const createVehicle = async (req: Request, res: Response) => {
  try {
    const { make, model, category, price, quantity, year, description } = req.body;
    const imageUrl = req.file ? (req.file.path || (req.file as any).secure_url || '') : '';

    const vehiclePayload: any = {
      make: typeof make === 'string' ? make.trim() : make,
      model: typeof model === 'string' ? model.trim() : model,
      category: typeof category === 'string' ? category.trim() : category,
      price: Number(price),
      quantity: Number(quantity),
      year: year !== undefined && year !== '' ? Number(year) : undefined,
      description: typeof description === 'string' ? description.trim() : description,
    };

    if (imageUrl) {
      vehiclePayload.imageUrl = imageUrl;
    }

    const newVehicle = await Vehicle.create(vehiclePayload);

    const responseVehicle = {
      ...newVehicle.toObject(),
      imageUrl: newVehicle.imageUrl,
      image: newVehicle.imageUrl,
    };

    return res.status(201).json({ vehicle: responseVehicle });
  } catch (error: any) {
    // Catch MongoDB Compound Index Duplicate Error
    if (error.code === 11000) {
      return res.status(409).json({ message: 'A vehicle with this make, model, year, and category already exists.' });
    }
    // Catch Mongoose Validation Errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// UPDATE Vehicle
export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicleId = Array.isArray(id) ? id[0] : id;

    if (!vehicleId || !mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: 'Invalid vehicle ID format' });
    }

    const updates = { ...req.body };

    if (req.file) {
      updates.imageUrl = req.file.path;
    }

    if (updates.price !== undefined) updates.price = Number(updates.price);
    if (updates.quantity !== undefined) updates.quantity = Number(updates.quantity);
    if (updates.year !== undefined && updates.year !== '') {
      updates.year = Number(updates.year);
    }
    if (typeof updates.category === 'string') updates.category = updates.category.trim();
    if (typeof updates.make === 'string') updates.make = updates.make.trim();
    if (typeof updates.model === 'string') updates.model = updates.model.trim();
    if (typeof updates.description === 'string') updates.description = updates.description.trim();

    const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    return res.status(200).json({ vehicle: updatedVehicle ? { ...updatedVehicle.toObject(), imageUrl: updatedVehicle.imageUrl, image: updatedVehicle.imageUrl } : null });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Update creates a duplicate vehicle.' });
    }
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// RESTOCK Vehicle
export const restockVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { addedQuantity } = req.body;
    const vehicleId = Array.isArray(id) ? id[0] : id;

    if (!vehicleId || !mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: 'Invalid vehicle ID format' });
    }

    // Ensure addedQuantity is a valid positive number
    const numAdded = Number(addedQuantity);
    if (isNaN(numAdded) || numAdded <= 0) {
      return res.status(400).json({ message: 'addedQuantity must be a positive number' });
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    vehicle.quantity += numAdded;
    await vehicle.save();

    return res.status(200).json({ 
      message: 'Vehicle restocked successfully', 
      vehicle 
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE Vehicle
export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicleId = Array.isArray(id) ? id[0] : id;

    if (!vehicleId || !mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: 'Invalid vehicle ID format' });
    }

    const vehicle = await Vehicle.findByIdAndDelete(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    return res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};