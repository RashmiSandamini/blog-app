import express from 'express';
import postRoutes from './routes/posts.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/posts', postRoutes);
