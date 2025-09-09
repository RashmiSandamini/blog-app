import express from 'express';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import cors from 'cors';
import sequelize from './database.js';
import User from './models/user.js';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const seedAdmin = async () => {
  const admin = await User.findOne({ where: { username: 'admin' } });
  if (!admin) {
    await User.create({
      username: 'admin',
      email: 'admin@gmail.com',
      password: await bcrypt.hash('1234', 8),
      is_admin: true,
    });
    console.log('Admin user created');
  }
};

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');

    await sequelize.sync({ alter: true });
    await seedAdmin();
    console.log('Database synced');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
