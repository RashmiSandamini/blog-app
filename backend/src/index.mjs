import express from 'express';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import cors from 'cors';
import sequelize from './database.js';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced');
  } catch (error) {
    console.error('Error syncing database: ', error);
  }
};

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
