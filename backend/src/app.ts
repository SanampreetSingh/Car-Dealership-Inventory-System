import express from 'express';

const app = express();

// Built-in middleware for parsing JSON
app.use(express.json());

// Routes will be added here later
// app.use('/api/auth', authRoutes);

// This line is required to fix the TS(1192) error
export default app;