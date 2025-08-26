import { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Home() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:3000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setLoading(false);
        });

      axios
        .get('http://localhost:3000/api/posts')
        .then((res) => setPosts(res.data))
        .catch((err) => console.error('Posts error:', err))
        .finally(() => setLoading(false));
    } else {
      navigate('/');
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='shadow-md rounded-3xl bg-white'>
        <header className='w-full flex items-center justify-between sm:py-4 sm:p-10 py-3 p-5'>
          <div>
            <img
              src='/logo.svg'
              alt='logo'
              className='w-16 cursor-pointer max-w-xs'
            />
          </div>

          <nav className='flex items-center'>
            <ul className='flex gap-12 text-md items-center'>
              <li className='hidden md:block hover:text-primary'>
                <button onClick={() => {}} className='cursor-pointer '>
                  Write
                </button>
              </li>

              <li className='cursor-pointer hover:text-primary'>
                <Avatar className='size-10'>
                  <AvatarImage
                    src={
                      userData?.profilePicture ||
                      'https://github.com/shadcn.png'
                    }
                    alt='@shadcn'
                  />
                  <AvatarFallback className='text-xs'>
                    {userData?.username?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </li>
            </ul>
          </nav>
        </header>
      </div>

      <div className='mt-10 mx-auto'>
        <h1 className='text-4xl font-semibold mb-4'>
          Welcome {userData?.username}!
        </h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 pb-10'>
        {posts.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
