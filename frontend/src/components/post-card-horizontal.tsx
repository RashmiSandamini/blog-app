import { Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { useNavigate } from 'react-router-dom';

type PostType = 'draft' | 'published';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    subtitle: string;
    content: string;
    cover_photo?: string;
    user_id: number;
    username: string;
    created_at: string;
    updated_at: string;
    authorProfilePicture?: string;
  };
  type: PostType;
  onEdit?: (id: number) => void;
  onDelete?: () => void;
}

export default function PostCardHorizontal({
  post,
  type,
  onEdit,
  onDelete,
}: PostCardProps) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    if (type === 'draft') {
      navigate(`/edit-post/${post.id}`, { state: { post } });
    } else {
      navigate(`/posts/${post.id}`);
    }
  };
  return (
    <div
      className='flex items-stretch gap-4 p-4 border rounded-3xl shadow-sm hover:shadow-md transition bg-white'
      onClick={handleCardClick}
    >
      <img
        src={post.cover_photo}
        alt='post'
        className='hidden sm:block w-32 h-20 object-cover rounded-md'
      />

      <div className='flex-1'>
        <h2 className='text-lg font-semibold'>{post.title}</h2>
        <p className='text-sm text-gray-600 mt-1 line-clamp-2'>
          {post.subtitle}
        </p>
        {type === 'published' ? (
          <p className='text-xs text-gray-400 mt-2'>
            Published on:{' '}
            {new Date(post.created_at).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        ) : (
          <p className='text-xs text-gray-400 mt-2'>
            Last edited:{' '}
            {new Date(post.updated_at || post.created_at).toLocaleDateString(
              'en-US',
              {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }
            )}
          </p>
        )}
      </div>

      <div
        className='flex justify-center items-center gap-6 px-2'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onEdit?.(post.id)}
          className='text-gray-600 hover:text-blue-600'
        >
          <Pencil size={18} />
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className='text-gray-600 hover:text-red-600'
              aria-label='Delete post'
            >
              <Trash2 size={18} />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className='rounded-3xl'>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete?.()}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
