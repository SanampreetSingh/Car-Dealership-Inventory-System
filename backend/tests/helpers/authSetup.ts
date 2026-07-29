import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../src/app';
import { User } from '../../src/models/User';

let mongoServer: MongoMemoryServer;

// ==========================================
// DATABASE HELPERS
// ==========================================

export const connectTestDB = async () => {
  // Prevent creating multiple instances if connectTestDB is called multiple times
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
  }
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

export const closeTestDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
};

// ==========================================
// AUTHENTICATION HELPERS
// ==========================================

// Helper 1: Generates and returns a standard user JWT
export const getTestUserToken = async (): Promise<string> => {
  const user = { name: 'Normal User', email: 'user@dealership.com', password: 'password123' };
  
  await request(app).post('/api/auth/register').send(user);
  
  const res = await request(app).post('/api/auth/login').send({
    email: user.email,
    password: user.password,
  });
  
  return res.body.token;
};

// Helper 2: Generates, promotes, and returns an admin JWT
export const getTestAdminToken = async (): Promise<string> => {
  const admin = { name: 'Admin User', email: 'admin@dealership.com', password: 'password123' };
  
  await request(app).post('/api/auth/register').send(admin);
  
  // Manually upgrade the user to admin directly in the database
  await User.findOneAndUpdate({ email: admin.email }, { role: 'admin' });
  
  const res = await request(app).post('/api/auth/login').send({
    email: admin.email,
    password: admin.password,
  });
  
  return res.body.token;
};