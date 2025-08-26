import Header from '../components/Header';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { useState } from 'react';
import { SignUpForm } from '../components/SignUp';
import { SignInForm } from '../components/SignIn';

export default function Home() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('Join Blogsy');

  const switchToSignIn = () => {
    setIsSignUpOpen(false);
    setTimeout(() => setIsSignInOpen(true), 100);
  };

  const switchToSignUp = () => {
    setIsSignInOpen(false);
    setTimeout(() => setIsSignUpOpen(true), 100);
  };

  const closeDialog = () => {
    setIsSignInOpen(false);
  };

  const openWriteDialog = () => {
    setDialogTitle('Create an account to start writing');
    setIsSignUpOpen(true);
  };

  const openGetStartedDialog = () => {
    setDialogTitle('Join Blogsy');
    setIsSignUpOpen(true);
  };
  return (
    <>
      <Header
        setIsSignInOpen={setIsSignInOpen}
        openWriteDialog={openWriteDialog}
        openGetStartedDialog={openGetStartedDialog}
      />
      <div className='flex items-center mt-12'>
        <div className='flex flex-1'>
          <div className='p-8 flex flex-col gap-5 w-full max-w-xl'>
            <h1 className='text-6xl font-semibold text-gray-800 font-serif leading-tight'>
              Ideas worth sharing.
            </h1>
            <p className='text-lg text-gray-600 mt-2'>
              A space to explore ideas, express your voice, and engage with
              meaningful stories that inspire, challenge, and connect us all.
            </p>
            <Button
              className='w-1/3 rounded-full'
              onClick={() => {
                setIsSignUpOpen(true);
              }}
            >
              {' '}
              Start Reading
            </Button>

            <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className='text-center text-2xl'>
                    {dialogTitle}
                  </DialogTitle>
                  <DialogDescription>
                    Create your account to start exploring stories and sharing
                    yours.
                  </DialogDescription>
                </DialogHeader>
                <SignUpForm />
                <p className='text-sm text-center mt-4 text-muted-foreground'>
                  Already have an account?{' '}
                  <span
                    className='text-primary underline cursor-pointer'
                    onClick={switchToSignIn}
                  >
                    Sign In
                  </span>
                </p>
              </DialogContent>
            </Dialog>

            <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className='text-center text-2xl'>
                    Welcome Back!
                  </DialogTitle>
                  <DialogDescription>
                    Sign in to continue exploring and sharing.
                  </DialogDescription>
                </DialogHeader>
                <SignInForm closeDialog={closeDialog} />
                <p className='text-sm text-center mt-4 text-muted-foreground'>
                  Don’t have an account?{' '}
                  <span
                    className='text-primary underline cursor-pointer'
                    onClick={switchToSignUp}
                  >
                    Sign Up
                  </span>
                </p>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className='flex-1'>
          <img src='/hero-image.svg' alt='a free girl' className='w-full' />
        </div>
      </div>
    </>
  );
}
