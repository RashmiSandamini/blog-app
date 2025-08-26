import * as authService from '../services/auth.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await authService.checkUserExists(email);
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    await authService.createUser(username, email, password);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authService.checkUserExists(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await authService.comparePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = authService.generateToken(user.id, user.email);

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
