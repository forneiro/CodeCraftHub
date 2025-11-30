// tests/userService.test.js
const User = require('../src/models/userModel');
const userService = require('../src/services/userService');

describe('User Service', () => {

  beforeEach(async () => {
    await User.deleteMany();
  });

  it('should create a user', async () => {
    const user = await userService.createUser({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    expect(user).toHaveProperty('_id');
    expect(user.username).toBe('testuser');
  });
});
