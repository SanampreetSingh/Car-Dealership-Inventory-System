import request from 'supertest';
import path from 'path';
import mongoose from 'mongoose';
import app from '../../src/app'; 
import { getTestAdminToken, getTestUserToken } from '../helpers/authSetup';

// Mock Cloudinary to prevent actual uploads during testing
jest.mock('../../src/config/cloudinary', () => ({
  uploader: {
    upload: jest.fn().mockResolvedValue({
      secure_url: 'https://res.cloudinary.com/demo/image/upload/dummy-car.jpg',
      public_id: 'test_car_image_id',
    }),
    destroy: jest.fn().mockResolvedValue({ result: 'ok' }),
  },
}));

describe('Admin Vehicle API Integration Tests', () => {
  let adminToken: string;
  let userToken: string;
  let createdVehicleId: string;
  const dummyImagePath = path.join(__dirname, '../fixtures/dummy-car.jpg');

  beforeAll(async () => {
    adminToken = await getTestAdminToken();
    userToken = await getTestUserToken();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  // ==========================================
  // 1. CREATE VEHICLE (POST /api/vehicles)
  // ==========================================
  describe('POST /api/vehicles', () => {
    it('should create a vehicle with an image when admin submits valid data (201)', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${adminToken}`)
        .field('make', 'Toyota')
        .field('model', 'Camry')
        .field('category', 'Sedan')
        .field('price', '25000')
        .field('quantity', '5')
        .field('year', '2023')
        .field('description', 'A reliable family sedan')
        .attach('image', dummyImagePath);

      expect(res.status).toBe(201);
      expect(res.body.vehicle.make).toBe('Toyota');
      expect(res.body.vehicle.category).toBe('Sedan');
      expect(res.body.vehicle.quantity).toBe(5);
      expect(res.body.vehicle.imageUrl).toBe('https://res.cloudinary.com/demo/image/upload/dummy-car.jpg');
      
      createdVehicleId = res.body.vehicle._id;
    });

    it('should fail if a vehicle with the exact make, model, year, and category already exists (409)', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${adminToken}`)
        .field('make', 'Toyota')       // Matches first test
        .field('model', 'Camry')       // Matches first test
        .field('category', 'Sedan')    // Matches first test
        .field('year', '2023')         // Matches first test
        .field('price', '22000')       // Different price doesn't matter, index will still trigger
        .field('quantity', '10')
        .attach('image', dummyImagePath);

      expect(res.status).toBe(409); 
      expect(res.body.message).toMatch(/already exists/i);
    });

    it('should fail if required fields are missing (400)', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${adminToken}`)
        .field('make', 'Toyota') // Missing model, category, price, quantity
        .attach('image', dummyImagePath);

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });

    it('should block a request missing an auth token (401)', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .field('make', 'Toyota');

      expect(res.status).toBe(401);
    });

    it('should block a standard user from creating a vehicle (403)', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${userToken}`)
        .field('make', 'Honda')
        .attach('image', dummyImagePath);

      expect(res.status).toBe(403);
    });
  });

  // ==========================================
  // 2. UPDATE VEHICLE (PUT /api/vehicles/:id)
  // ==========================================
  describe('PUT /api/vehicles/:id', () => {
    it('should allow an admin to update text fields only (200)', async () => {
      const res = await request(app)
        .put(`/api/vehicles/${createdVehicleId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ price: 24000, description: 'Updated description' }); 

      expect(res.status).toBe(200);
      expect(res.body.vehicle.price).toBe(24000);
      expect(res.body.vehicle.description).toBe('Updated description');
    });

    it('should allow an admin to upload a new image and replace the old one (200)', async () => {
      const res = await request(app)
        .put(`/api/vehicles/${createdVehicleId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .field('price', '23500')
        .attach('image', dummyImagePath); 

      expect(res.status).toBe(200);
      expect(res.body.vehicle.price).toBe(23500);
    });

    it('should return 404 if updating a non-existent vehicle ID', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .put(`/api/vehicles/${fakeId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ price: 10000 });

      expect(res.status).toBe(404);
    });

    it('should return 400 for an invalid MongoDB ID format', async () => {
      const res = await request(app)
        .put(`/api/vehicles/invalid-id-format`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ price: 10000 });

      expect(res.status).toBe(400);
    });

    it('should block a standard user from updating a vehicle (403)', async () => {
      const res = await request(app)
        .put(`/api/vehicles/${createdVehicleId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ price: 100 });

      expect(res.status).toBe(403);
    });
  });

  // ==========================================
  // 3. RESTOCK VEHICLE (POST /api/vehicles/:id/restock)
  // ==========================================
  describe('POST /api/vehicles/:id/restock', () => {
    it('should allow an admin to increase the quantity (200)', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${createdVehicleId}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ addedQuantity: 3 }); 

      expect(res.status).toBe(200);
      // Original was 5, we expect it to now be 8
      expect(res.body.vehicle.quantity).toBe(8);
      expect(res.body.message).toMatch(/restocked successfully/i);
    });

    it('should fail if addedQuantity is negative or invalid (400)', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${createdVehicleId}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ addedQuantity: -5 });

      expect(res.status).toBe(400);
    });

    it('should block a standard user from restocking a vehicle (403)', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${createdVehicleId}/restock`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ addedQuantity: 5 });

      expect(res.status).toBe(403);
    });
  });

  // ==========================================
  // 4. DELETE VEHICLE (DELETE /api/vehicles/:id)
  // ==========================================
  describe('DELETE /api/vehicles/:id', () => {
    it('should block a standard user from deleting a vehicle (403)', async () => {
      const res = await request(app)
        .delete(`/api/vehicles/${createdVehicleId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(403);
    });

    it('should return 404 if deleting a non-existent vehicle ID', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .delete(`/api/vehicles/${fakeId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(404);
    });

    it('should return 400 for an invalid MongoDB ID format', async () => {
      const res = await request(app)
        .delete(`/api/vehicles/invalid-id-format`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(400);
    });

    it('should allow an admin to delete a vehicle (200)', async () => {
      const res = await request(app)
        .delete(`/api/vehicles/${createdVehicleId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/deleted successfully/i);
    });
  });
});