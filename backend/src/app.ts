import express, { Application } from 'express';
import cors from 'cors';

// Import Routers
import authRoutes from './routes/auth.routes'; // Assuming you have an auth router
import adminVehicleRoutes from './routes/admin.vehicle.routes';

const app: Application = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes); 
app.use('/api/vehicles', adminVehicleRoutes);

// Optional: Basic 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;