import pool from '../database.js';

export const getUser = async (userId) => {
  try {
    const [rows] = await pool.query(
      'SELECT id,username, email, img FROM users WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      throw new Error('User not found');
    }
    return rows[0];
  } catch (err) {
    console.error('Error fetching user:', err.message);
    throw err;
  }
};
