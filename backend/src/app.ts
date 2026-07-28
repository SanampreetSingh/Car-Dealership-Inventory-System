import express from 'express';
import authRoutes from './routes/authRoutes';

const app = express();

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Mount the authentication routes
app.use('/api/auth', authRoutes);

export default app;