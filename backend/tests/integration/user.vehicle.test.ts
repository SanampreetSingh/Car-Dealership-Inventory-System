import request from 'supertest';
import app from '../../src/app';
import { connectTestDB, closeTestDB, getTestUserToken } from '../helpers/authSetup';
import { seedTestVehicles } from '../helpers/vehicleSetup';

describe('Public & User Vehicle API Integration Tests', () => {
  let userToken: string;
  let vehicleIds: { [key: string]: string };

  beforeAll(async () => {
    await connectTestDB();
    userToken = await getTestUserToken();
    // Populate database with our preset vehicles
    vehicleIds = await seedTestVehicles();
  });

  afterAll(async () => {
    await closeTestDB();
  });

  describe('GET /api/vehicles (Catalog & Filtering)', () => {
    it('should return all available vehicles with default pagination (200)', async () => {
      const res = await request(app).get('/api/vehicles');
      expect(res.status).toBe(200);
      expect(res.body.vehicles).toBeDefined();
      expect(res.body.vehicles.length).toBe(5);
    });

    it('should filter vehicles by category (200)', async () => {
      const res = await request(app).get('/api/vehicles?category=SUV');
      expect(res.status).toBe(200);
      expect(res.body.vehicles.length).toBe(2); // Model Y & Tahoe
    });
  });

  describe('GET /api/vehicles/search (Advanced Search)', () => {
    it('should search vehicles by keyword across make/model (200)', async () => {
      const res = await request(app).get('/api/vehicles/search?keyword=Mustang');
      expect(res.status).toBe(200);
      expect(res.body.vehicles.length).toBe(1);
      expect(res.body.vehicles[0].make).toBe('Ford');
    });
  });

  describe('POST /api/vehicles/:id/purchase (User Purchase)', () => {
    it('should allow an authenticated user to purchase a vehicle and decrease stock (200)', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${vehicleIds.camryId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.vehicle.quantity).toBe(4); // Started at 5, decreased to 4
    });

    it('should fail if vehicle stock is zero (out of stock) (400/422)', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${vehicleIds.outOfStockId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(400); // Or 422 depending on your controller implementation
      expect(res.body.message).toMatch(/out of stock|unavailable/i);
    });
  });
});