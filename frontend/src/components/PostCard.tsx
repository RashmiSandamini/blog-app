import { Link } from 'react-router-dom';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    date: string;
    desc: string;
    username: string;
    imgUrl?: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/posts/${post.id}`}>
      <div
        key={post.id}
        className='hover:cursor-pointer h-96 bg-white shadow-md rounded-3xl border border-gray-200 hover:shadow-xl transition duration-300 flex flex-col overflow-hidden'
      >
        <img
          src={
            post.imgUrl ??
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTixMUT-tvYkn-4K0khhYC3lKHV_mRmBGpc0g&s'
          }
          alt={post.title}
          className='w-full h-2/3 object-cover'
        />
        <div className='p-4 flex-1 flex flex-col'>
          <h2 className='text-xl font-bold mb-2'>{post.title}</h2>
          <p className='text-gray-600 text-sm mb-2'>
            by {post.username} on{' '}
            {new Date(post.date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
          <p className='text-gray-700 text-sm line-clamp-3'>{post.desc}</p>
        </div>
      </div>
    </Link>
  );
}
