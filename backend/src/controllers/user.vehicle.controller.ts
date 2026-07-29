import { Request, Response } from 'express';
import Vehicle from '../models/Vehicle';

/**
 * Get all vehicles with optional query filters (category, make, price range, etc.) and pagination.
 */
export const getVehicles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, make, minPrice, maxPrice, keyword, page = 1, limit = 40 } = req.query;

    const conditions: any[] = [];

    if (keyword) {
      const keywordRegex = new RegExp(keyword as string, 'i');
      conditions.push({
        $or: [
          { make: keywordRegex },
          { model: keywordRegex },
          { description: keywordRegex },
          { category: keywordRegex },
        ],
      });
    }

    if (category) {
      conditions.push({ category });
    }

    if (make) {
      conditions.push({ make: new RegExp(make as string, 'i') });
    }

    if (minPrice || maxPrice) {
      const priceCondition: any = {};
      if (minPrice) priceCondition.$gte = Number(minPrice);
      if (maxPrice) priceCondition.$lte = Number(maxPrice);
      conditions.push({ price: priceCondition });
    }

    const query = conditions.length > 0 ? { $and: conditions } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const vehicles = await Vehicle.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1, _id: 1 });

    const total = await Vehicle.countDocuments(query);
    const normalizedPage = Math.max(1, Number(page) || 1);
    const totalPages = Math.max(1, Math.ceil(total / Number(limit)) || 1);

    res.status(200).json({
      success: true,
      count: vehicles.length,
      total,
      totalPages,
      currentPage: Math.min(normalizedPage, totalPages),
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