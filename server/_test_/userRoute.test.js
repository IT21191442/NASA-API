// auth.test.js
const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = require('../index'); // Assuming your Express app is exported from 'index.js'
const { User } = require('../models/user');

describe('Authentication Route', () => {
  describe('POST /api/auth', () => {
    test('should return a valid token when valid credentials are provided', async () => {
      // Create a test user
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        password: 'password123',
      };
      // Send a POST request to create the user
      await request(app)
        .post('/api/users')
        .send(userData);

      // Send a POST request to the authentication route with valid credentials
      const response = await request(app)
        .post('/api/auth')
        .send({ email: userData.email, password: userData.password });

      // Expectations
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('logged in successfully');

      // Verify if the token is valid
      const decoded = jwt.verify(response.body.data, process.env.JWTPRIVATEKEY);
      expect(decoded).toHaveProperty('_id');

      // Check if the user data is saved in the database
      const user = await User.findOne({ email: userData.email });
      expect(user).toBeTruthy();
      expect(user.firstName).toBe(userData.firstName);
      expect(user.lastName).toBe(userData.lastName);
      expect(user.email).toBe(userData.email);
    });

    test('should return 401 if invalid credentials are provided', async () => {
      // Send a POST request to the authentication route with invalid credentials
      const response = await request(app)
        .post('/api/auth')
        .send({ email: 'nonexistent@example.com', password: 'invalidpassword' });

      // Expectations
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid Email or Password');
    });

    // Additional test cases for validation, error handling, etc. can be added here
  });
});
