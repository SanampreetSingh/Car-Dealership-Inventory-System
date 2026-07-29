import { Router } from 'express';
import { 
  createVehicle, 
  updateVehicle, 
  deleteVehicle, 
  restockVehicle 
} from '../controllers/admin.vehicle.controller';
import { protect, authorizeAdmin } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware'; 

const router = Router();

// Apply auth middleware to secure all endpoints in this router
router.use(protect);
router.use(authorizeAdmin);

// Create a new vehicle - expecting multipart/form-data with an 'image' field
router.post('/', upload.single('image'), createVehicle);

// Update an existing vehicle
router.put('/:id', upload.single('image'), updateVehicle);

// Restock a vehicle (Atomic operation)
router.post('/:id/restock', restockVehicle);

// Delete a vehicle
router.delete('/:id', deleteVehicle);

export default router;