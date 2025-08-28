import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { FileUploadComponent } from '../components/file-upload-component';
import Header from '../components/header';
import {
  MDXEditor,
  headingsPlugin,
  toolbarPlugin,
  markdownShortcutPlugin,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuth } from '../context/auth-context';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { X } from 'lucide-react';

const postSchema = z.object({
  title: z.string().min(3, 'Title should be more than 3 characters'),
  subtitle: z.string().min(3, 'Subtitle should be more than 3 characters'),
  coverPhoto: z.array(z.instanceof(File)).optional(),
  markdown: z.string().min(1, 'Content cannot be empty'),
});

type PostFormData = z.infer<typeof postSchema>;

export default function EditPost() {
  const { id } = useParams();
  const { user, token, loading } = useAuth();
  const navigate = useNavigate();
  // const [initialLoading, setInitialLoading] = useState(true);
  const [existingCoverPhoto, setExistingCoverPhoto] = useState<string | null>(
    null
  );
  const [submitMode, setSubmitMode] = useState<'draft' | 'publish'>('draft');

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      coverPhoto: [],
      markdown: '',
    },
  });

  const location = useLocation();
  const postFromState = location.state?.post;

  useEffect(() => {
    if (!user && !loading) navigate('/');
  }, [id, token, loading]);

  useEffect(() => {
    if (postFromState) {
      reset({
        title: postFromState.title,
        subtitle: postFromState.subtitle,
        markdown: postFromState.content,
        coverPhoto: [],
      });
      setExistingCoverPhoto(postFromState.cover_photo ?? null);
      // setInitialLoading(false);
    } else {
      fetchPost();
    }
  }, []);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/posts/${id}`);
      const post = res.data;

      reset({
        title: post.title,
        subtitle: post.subtitle,
        markdown: post.content,
        coverPhoto: [],
      });

      setExistingCoverPhoto(post.cover_photo ?? null);
      // setInitialLoading(false);
    } catch (error) {
      toast.error('Failed to fetch post data');
      navigate('/me/stories');
    }
  };

  const onSubmit = async (data: PostFormData) => {
    if (
      !existingCoverPhoto &&
      (!data.coverPhoto || data.coverPhoto.length === 0)
    ) {
      setError('coverPhoto', {
        type: 'manual',
        message: 'Cover photo is required.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle);
    formData.append('markdown', data.markdown);

    if (data.coverPhoto && data.coverPhoto.length > 0) {
      formData.append('coverPhoto', data.coverPhoto[0]);
    }

    try {
      if (submitMode === 'draft') {
        await axios.put(
          `http://localhost:3000/api/posts/${id}?status=draft`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success('Draft saved successfully!');
      } else {
        await axios.put(
          `http://localhost:3000/api/posts/${id}?status=published`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success('Post published successfully!');
      }

      navigate('/me/stories');
    } catch (err) {
      toast.error('Failed to update post');
    }
  };

  if (loading || !user) return null;
  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-3xl mx-auto px-4 py-12 space-y-8'
        noValidate
      >
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Edit Post</h1>
          <p className='text-sm text-gray-500 mt-1'>
            Modify your content and update your story.
          </p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='title'>Title</Label>
          <Input
            id='title'
            placeholder='Enter your post title'
            {...register('title')}
            aria-invalid={!!errors.title}
            aria-describedby='title-error'
          />
          {errors.title && (
            <p className='text-sm text-red-600' id='title-error'>
              {errors.title.message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='subtitle'>Subtitle</Label>
          <Textarea
            id='subtitle'
            placeholder='A short description or summary of your post'
            rows={3}
            {...register('subtitle')}
            aria-invalid={!!errors.subtitle}
            aria-describedby='subtitle-error'
          />
          {errors.subtitle && (
            <p className='text-sm text-red-600' id='subtitle-error'>
              {errors.subtitle.message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label>Cover Image</Label>

          {existingCoverPhoto ? (
            <div className='relative w-64 h-40 rounded overflow-hidden border'>
              <img
                src={existingCoverPhoto}
                alt='Cover'
                className='w-full h-full object-cover'
              />
              <button
                type='button'
                onClick={() => {
                  setExistingCoverPhoto(null);
                  setValue('coverPhoto', []);
                }}
                className='absolute top-1 right-1 bg-white p-1 rounded-full shadow'
                title='Remove cover photo'
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <Controller
              control={control}
              name='coverPhoto'
              render={({ field }) => (
                <FileUploadComponent
                  limit={1}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          )}

          {errors.coverPhoto && (
            <p className='text-sm text-red-600'>{errors.coverPhoto.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label>Post Content</Label>
          <Controller
            control={control}
            name='markdown'
            render={({ field }) => (
              <MDXEditor
                markdown={field.value}
                onChange={field.onChange}
                className='border rounded-md'
                placeholder='Your content starts here.'
                contentEditableClassName='prose prose-neutral max-w-none min-h-[300px] p-4'
                plugins={[
                  headingsPlugin(),
                  markdownShortcutPlugin(),
                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        <BlockTypeSelect />
                        <BoldItalicUnderlineToggles />
                      </>
                    ),
                  }),
                ]}
              />
            )}
          />
          {errors.markdown && (
            <p className='text-sm text-red-600'>{errors.markdown.message}</p>
          )}
        </div>

        <div className='flex flex-col items-end gap-4'>
          <Button
            type='submit'
            onClick={() => setSubmitMode('draft')}
            className='rounded-3xl px-6 py-2 transition bg-secondary text-black hover:bg-accent'
          >
            {isSubmitting ? 'Saving...' : 'Save as a Draft'}
          </Button>

          <Button
            type='submit'
            disabled={!isDirty}
            onClick={() => setSubmitMode('publish')}
            className='rounded-3xl px-6 py-2 transition text-black'
          >
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
          </Button>
        </div>
      </form>
    </>
  );
}
