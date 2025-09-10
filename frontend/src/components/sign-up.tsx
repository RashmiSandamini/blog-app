import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import axios from 'axios';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

const SignUpSchema = z
  .object({
    email: z.email({ message: 'Enter a valid email address.' }),
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      ),
    cpassword: z.string(),
  })
  .refine((data) => data.password === data.cpassword, {
    message: 'Passwords do not match.',
    path: ['cpassword'],
  });

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type SignUpFormData = z.infer<typeof SignUpSchema>;

interface SignUpFormProps {
  switchToSignIn: () => void;
}

export function SignUpForm({ switchToSignIn }: SignUpFormProps) {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      cpassword: '',
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Account created successfully!');
      switchToSignIn();
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Network error. Try again later.');
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email address' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='cpassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Confirm Password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full'>
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
