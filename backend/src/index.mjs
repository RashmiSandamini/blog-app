import express from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const posts = [
  {
    id: 1,
    title: 'First Post',
    content: 'This is the content of the first post.',
  },
  {
    id: 2,
    title: 'Second Post',
    content: 'This is the content of the second post.',
  },
];

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/posts', (request, response) => {
  response.send(posts);
});

app.get('/api/posts/:id', (request, response) => {
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  if (isNaN(parsedId)) {
    return response.status(400).send({ message: 'Bad Request' });
  }

  const post = posts.find((p) => p.id === parsedId);
  if (!post) {
    return response.status(404).send({ message: 'Post Not Found' });
  }
  return response.send(post);
});

app.post('/api/posts', (request, response) => {
  console.log(request.body);
  const newPost = {};

  return response.send(200);
});
