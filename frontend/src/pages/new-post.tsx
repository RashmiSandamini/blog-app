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
import { useNavigate } from 'react-router-dom';

const postSchema = z.object({
  title: z.string().min(3, 'Title should be more than 3 characters'),
  subtitle: z.string().min(3, 'Subtitle should be more than 3 characters'),
  coverPhoto: z.array(z.instanceof(File)).min(1, 'Cover photo is required'),
  markdown: z.string().min(1, 'Content cannot be empty'),
});
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type PostFormData = z.infer<typeof postSchema>;

export default function NewPost() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      coverPhoto: [],
      markdown: '',
    },
  });
  const { user, token, loading } = useAuth();
  const navigate = useNavigate();
  const [submitMode, setSubmitMode] = useState<'draft' | 'publish'>('draft');
  const watchedValues = watch();

  const isDraftButtonEnabled =
    watchedValues.title?.trim() &&
    (watchedValues.subtitle?.trim() ||
      (watchedValues.coverPhoto && watchedValues.coverPhoto.length > 0) ||
      watchedValues.markdown?.trim());

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, token, loading]);

  const onSubmit = async (data: PostFormData) => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle);
    formData.append('markdown', data.markdown);

    if (data.coverPhoto.length > 0) {
      formData.append('coverPhoto', data.coverPhoto[0]);
    }

    try {
      if (submitMode === 'draft') {
        await axios.post(`${API_BASE_URL}/posts?status=draft`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Draft saved successfully!');
        navigate('/me/stories');
      } else {
        await axios.post(`${API_BASE_URL}/posts?status=published`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Post published successfully!');
        navigate('/me/stories');
      }
    } catch (err) {
      toast.error('Failed to create post');
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
          <h1 className='text-3xl font-bold text-gray-900'>
            Create a New Post
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Fill in the details below to publish your story.
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
            disabled={!isDraftButtonEnabled || isSubmitting}
            className='rounded-3xl px-6 py-2 transition bg-secondary text-black hover:bg-accent'
          >
            {isSubmitting ? 'Saving...' : 'Save as a Draft'}
          </Button>

          <Button
            type='submit'
            onClick={() => setSubmitMode('publish')}
            disabled={isSubmitting}
            className='rounded-3xl px-6 py-2 transition '
          >
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
          </Button>
        </div>
      </form>
    </>
  );
}
