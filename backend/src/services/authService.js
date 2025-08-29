import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const checkUserExistsByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: { email },
    });
    return user || null;
  } catch (error) {
    console.error('Error checking user by email:', error.message);
    throw error;
  }
};

export const checkUserExists = async (username) => {
  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });
    return user || null;
  } catch (error) {
    console.error('Error checking user by username: ', error.message);
  }
};

export const createUser = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return newUser.id;
  } catch (err) {
    console.error('Error creating user:', err.message);
    throw err;
  }
};

export const comparePassword = async (givenPassword, storedHashedPassword) => {
  return bcrypt.compare(givenPassword, storedHashedPassword);
};

export const generateToken = (userId, email) => {
  const payload = { userId, email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};
