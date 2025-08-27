import { Link } from 'react-router-dom';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    subtitle: string;
    date: string;
    created_at: string;
    desc: string;
    username: string;
    cover_photo?: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/posts/${post.id}`}>
      <div
        key={post.id}
        className='hover:cursor-pointer h-96 bg-white shadow-md rounded-3xl border border-gray-200 hover:shadow-xl transition duration-300 flex flex-col overflow-hidden'
      >
        <div className='h-2/3 w-full'>
          <img
            src={post.cover_photo}
            alt={post.title}
            className='w-full h-full object-cover'
          />
        </div>

        <div className='p-4 flex-1 flex flex-col overflow-hidden'>
          <h1 className='text-lg font-semibold mb-1 truncate'>{post.title}</h1>

          <p className='text-sm text-gray-700 line-clamp-2 mb-1'>
            {post.subtitle}
          </p>

          <p className='text-xs text-gray-500 mt-auto'>
            by {post.username} on{' '}
            {new Date(post.created_at).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}
