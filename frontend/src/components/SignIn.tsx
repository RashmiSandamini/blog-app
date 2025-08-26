import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  email: z.email({ message: 'Enter a valid email address' }),
  password: z.string().nonempty({ message: 'Password is required' }),
});

type FormData = z.infer<typeof formSchema>;

export function SignInForm({ closeDialog }: { closeDialog?: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      toast.success('Login successful!');
      localStorage.setItem('token', response.data.token);
      closeDialog && closeDialog();
      navigate('/');
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error('Invalid email or password');
      } else if (err.response?.status === 404) {
        toast.error('User not found');
      } else {
        toast.error('Login failed. Please try again.');
      }
      console.error('Login error:', err);
    }
  };

  // 3. UI
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <Input {...register('email')} type='email' placeholder='Email' />
        {errors.email && (
          <p className='text-sm text-red-500'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register('password')}
          type='password'
          placeholder='Password'
        />
        {errors.password && (
          <p className='text-sm text-red-500'>{errors.password.message}</p>
        )}
      </div>

      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
}
