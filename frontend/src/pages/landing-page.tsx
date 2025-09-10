import { useEffect, useState } from 'react';
import PostCard from '../components/post-card';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function LandingPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/posts`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('Posts error:', err));
  }, []);

  return (
    <>
      <div className='md:flex items-center mt-12'>
        <div className='flex flex-1'>
          <div className='sm:p-8 flex flex-col gap-5 w-full max-w-xl'>
            <h1 className='text-6xl font-semibold text-gray-800 font-serif leading-tight'>
              Ideas worth sharing.
            </h1>
            <p className='text-lg text-gray-600 mt-2'>
              A space to explore ideas, express your voice, and engage with
              meaningful stories that inspire, challenge, and connect us all.
            </p>
          </div>
        </div>
        <div className='flex-1'>
          <img
            src='/hero-image.svg'
            alt='a free girl'
            className='w-full hidden md:block'
          />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 pb-10'>
        {posts.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
