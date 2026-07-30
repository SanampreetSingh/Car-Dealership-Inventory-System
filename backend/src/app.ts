import express, { Application } from 'express';
import cors from 'cors';

// Import Routers
import authRoutes from './routes/auth.routes'; // Assuming you have an auth router
import adminVehicleRoutes from './routes/admin.vehicle.routes';
import userVehicleRoutes from './routes/user.vehicle.routes';
import healthRoutes from './routes/health.routes';

const app: Application = express();

// Global Middlewares
// Configure CORS to use the environment variable
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/admin/vehicles', adminVehicleRoutes);
app.use('/api/vehicles', userVehicleRoutes);

// Optional: Basic 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;