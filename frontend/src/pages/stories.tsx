import { useEffect, useState } from 'react';
import Header from '../components/Header';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { useAuth } from '../context/auth-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostCardHorizontal from '../components/post-card-horizontal';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { BadgePlus } from 'lucide-react';

interface Post {
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
}

export default function Stories() {
  const { user, token, loading } = useAuth();
  const [drafts, setDrafts] = useState<Post[]>([]);
  const [published, setPublished] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }

    if (user && token) {
      fetchDrafts();
      fetchPublished();
    }
  }, [user, token, loading]);

  const fetchDrafts = async () => {
    try {
      if (!user) return;
      const res = await axios.get(
        `http://localhost:3000/api/users/drafts/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDrafts(res.data);
    } catch (err) {
      toast.error('Error fetching drafts');
    }
  };

  const fetchPublished = async () => {
    try {
      if (!user) return;
      const res = await axios.get(
        `http://localhost:3000/api/users/published/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPublished(res.data);
    } catch (err) {
      toast.error('Error fetching published posts');
    }
  };

  const handleDelete = async (id: number, type: 'draft' | 'published') => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Post deleted successfully!');
      if (type === 'draft') {
        setDrafts((prev) => prev.filter((post: any) => post.id !== id));
      } else if (type === 'published') {
        setPublished((prev) => prev.filter((post: any) => post.id !== id));
      }
    } catch (err) {
      toast.error('Failed to delete the post!');
    }
  };

  if (loading) return <div className='text-center mt-10'>Loading...</div>;

  return (
    <>
      <Header />
      <div className=' mt-12 sm:pl-28 sm:pr-28'>
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl font-bold mb-4 text-gray-800'>Your Posts</h1>
          <Button
            className='rounded-3xl border text-black'
            onClick={() => {
              if (!user) {
                toast.error('You must be logged in to create a post.');
                return;
              }
              navigate('/new-post');
            }}
          >
            {' '}
            <BadgePlus />
            New Post
          </Button>
        </div>

        <Tabs defaultValue='draft' className='w-full '>
          <TabsList>
            <TabsTrigger value='draft'>Drafts</TabsTrigger>
            <TabsTrigger value='publish'>Published</TabsTrigger>
          </TabsList>
          <TabsContent value='draft'>
            <div className='space-y-4'>
              {drafts.length === 0 ? (
                <p className='text-gray-500'>No drafts found.</p>
              ) : (
                drafts.map((draft: any) => (
                  <PostCardHorizontal
                    key={draft.id}
                    post={draft}
                    type='draft'
                    onDelete={() => handleDelete(draft.id, 'draft')}
                    onEdit={() => navigate(`/edit-post/${draft.id}`)}
                  />
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value='publish'>
            {' '}
            <div className='space-y-4'>
              {published.length === 0 ? (
                <p className='text-gray-500'>No published posts found.</p>
              ) : (
                published.map((publish: any) => (
                  <PostCardHorizontal
                    key={publish.id}
                    post={publish}
                    type='published'
                    onDelete={() => handleDelete(publish.id, 'published')}
                    onEdit={() => navigate(`/edit-post/${publish.id}`)}
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
