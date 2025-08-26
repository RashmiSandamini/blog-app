import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import axios from 'axios';

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchPostAndUser = async () => {
      try {
        const userRes = await axios.get('http://localhost:3000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(userRes.data);

        const postRes = await axios.get(
          `http://localhost:3000/api/posts/${id}`
        );
        setPost(postRes.data);
      } catch (error) {
        let message = 'Something went wrong';
        if (axios.isAxiosError(error)) {
          message =
            error.response?.data?.message ||
            error.message ||
            'Something went wrong';
        } else if (error instanceof Error) {
          message = error.message;
        }
        setErrorMessage(message);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndUser();
  }, [id]);

  if (loading) return <div className='text-center mt-10'>Loading...</div>;
  if (!post) return <div className='text-center mt-10'>{errorMessage}</div>;

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

      <div className='max-w-3xl mx-auto mt-10 px-4 pb-10'>
        <h1 className='text-4xl font-bold mb-4 text-gray-800'>{post.title}</h1>
        <div className='flex gap-4'>
          <div>
            <Avatar className='size-10'>
              <AvatarImage
                src={
                  userData?.profilePicture || 'https://github.com/shadcn.png'
                }
                alt='@shadcn'
              />
              <AvatarFallback className='text-xs'>
                {userData?.username?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p>{post.username}</p>
            <p className='text-xs'>
              {' '}
              {new Date(post.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
        <hr className='my-6 border-gray-300' />
        <img
          className='w-full mx-auto my-6 rounded'
          src={
            post.imgUrl ??
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTixMUT-tvYkn-4K0khhYC3lKHV_mRmBGpc0g&s'
          }
        ></img>
        <p className=' '>{post.desc}</p>
      </div>
    </>
  );
}
