import request from 'supertest';
import app from '../../src/app';
import { User } from '../../src/models/User';

describe('Auth Endpoints (/api/auth)', () => {
  const testUser = {
    name: 'Test User',
    email: 'test@dealership.com',
    password: 'password123',
  };

  describe('POST /api/auth/register', () => {
    it('should register a new user and return a JWT token with status 201', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', testUser.email);
      expect(res.body.user).not.toHaveProperty('password');
      
      // Verify the user was actually saved in the database
      const userInDb = await User.findOne({ email: testUser.email });
      expect(userInDb).toBeTruthy();
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'incomplete@dealership.com' }); // Missing name and password

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });

    it('should return 400 if user with email already exists', async () => {
      // Seed the database with the user first
      await request(app).post('/api/auth/register').send(testUser);

      // Attempt to register again with the same email
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Seed a user before each login test
      await request(app).post('/api/auth/register').send(testUser);
    });

    it('should authenticate user and return a JWT token with status 200', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should return 401 for invalid password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message');
    });

    it('should return 401 for non-existent user email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nobody@dealership.com',
          password: 'password123',
        });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message');
    });
  });
});