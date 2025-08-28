import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import axios from 'axios';
import { useAuth } from '../context/auth-context';
import Header from '../components/header';
import ReactMarkdown from 'react-markdown';

interface Post {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  cover_photo?: string;
  user_id: number;
  username: string;
  created_at: string;
  authorProfilePicture?: string;
}

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>();
  const [errorMessage, setErrorMessage] = useState('');
  const { user, loading: authLoading } = useAuth();

  const [isSignInOpen, setIsSignInOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
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
      }
    };

    fetchPost();
  }, [id]);
  if (!post) return <div className='text-center mt-10'>Loading...</div>;
  if (!post) return <div className='text-center mt-10'>{errorMessage}</div>;

  return (
    <>
      <Header setIsSignInOpen={setIsSignInOpen} />
      <div className='max-w-3xl mx-auto mt-10 px-4 pb-10'>
        <h1 className='text-4xl font-bold mb-2 text-gray-800'>{post.title}</h1>
        <h2 className='text-sm mb-4 text-gray-600'>{post.subtitle}</h2>
        <div className='flex gap-4 items-center'>
          <Avatar className='size-10'>
            <AvatarImage src={post?.authorProfilePicture} alt={post.username} />
            <AvatarFallback className='text-xs'>
              {post?.username?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className='font-medium'>{post.username}</p>
            <p className='text-xs text-gray-500'>
              {new Date(post.created_at).toLocaleDateString('en-US', {
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
          src={post.cover_photo}
          alt={post.title}
        />
        <div className='prose max-w-none'>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        {/* <p className='whitespace-pre-line'>{post.desc}</p> */}
      </div>
    </>
  );
}
