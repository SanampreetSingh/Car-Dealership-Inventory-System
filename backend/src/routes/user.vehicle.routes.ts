import { Router } from 'express';
import { getVehicles, searchVehicles, purchaseVehicle } from '../controllers/user.vehicle.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Public routes for catalog browsing and searching
router.get('/', getVehicles);
router.get('/search', searchVehicles);

// Protected routes requiring authentication
router.use(protect);

router.post('/:id/purchase', purchaseVehicle);

export default router;