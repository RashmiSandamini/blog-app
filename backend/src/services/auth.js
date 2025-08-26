import bcrypt from 'bcryptjs';
import pool from '../database.js';
import jwt from 'jsonwebtoken';

export const checkUserExists = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [
    email,
  ]);
  if (rows.length > 0) {
    return rows[0];
  }
  return null;
};

export const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 8);
  const [result] = await pool.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );
  return result.insertId;
};

export const comparePassword = async (givenPassword, storedHashedPassword) => {
  return bcrypt.compare(givenPassword, storedHashedPassword);
};

export const generateToken = (userId, email) => {
  const payload = { userId, email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};
