import { Request, Response } from 'express';
import Vehicle from '../models/Vehicle';

/**
 * Get all vehicles with optional query filters (category, make, price range, etc.) and pagination.
 */
export const getVehicles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, make, minPrice, maxPrice, page = 1, limit = 40 } = req.query;

    const query: any = {};

    if (category) query.category = category;
    if (make) query.make = new RegExp(make as string, 'i'); // Case-insensitive make search
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const vehicles = await Vehicle.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Vehicle.countDocuments(query);

    res.status(200).json({
      success: true,
      count: vehicles.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      vehicles,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error fetching vehicles' });
  }
};

/**
 * Search vehicles by keyword across make, model, or description.
 */
export const searchVehicles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      res.status(400).json({ success: false, message: 'Search keyword is required' });
      return;
    }

    const regex = new RegExp(keyword as string, 'i');
    const vehicles = await Vehicle.find({
      $or: [
        { make: regex },
        { model: regex },
        { description: regex },
        { category: regex },
      ],
    });

    res.status(200).json({
      success: true,
      count: vehicles.length,
      vehicles,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error during vehicle search' });
  }
};

/**
 * Handle vehicle purchase (decrements quantity if available).
 */
export const purchaseVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      res.status(404).json({ success: false, message: 'Vehicle not found' });
      return;
    }

    if (vehicle.quantity <= 0) {
      res.status(400).json({ success: false, message: 'Vehicle is out of stock' });
      return;
    }

    vehicle.quantity -= 1;
    await vehicle.save();

    res.status(200).json({
      success: true,
      message: 'Vehicle purchased successfully',
      vehicle,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error during vehicle purchase' });
  }
};