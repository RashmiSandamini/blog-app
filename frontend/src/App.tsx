import { Toaster } from 'sonner';
import './App.css';
import LandingPage from './pages/landing-page';
import { Route, Routes } from 'react-router-dom';
import PostDetails from './pages/post-details';
import Stories from './pages/stories';
import NewPost from './pages/new-post';
import EditPost from './pages/edit-post';
import Footer from './components/footer';
import ProtectedRoutes from './components/protected-routes';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './components/ui/dialog';
import { SignUpForm } from './components/sign-up';
import { useState } from 'react';
import { SignInForm } from './components/sign-in';
import Header from './components/header';

function App() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('Join Blogsy');

  const switchToSignIn = () => {
    setIsSignUpOpen(false);
    setTimeout(() => setIsSignInOpen(true), 100);
  };
  // const switchToSignUp = () => {
  //   setIsSignInOpen(false);
  //   setTimeout(() => setIsSignUpOpen(true), 100);
  // };

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
    <div className='flex flex-col min-h-screen'>
      <Toaster />
      <Header
        setIsSignInOpen={setIsSignInOpen}
        openWriteDialog={openWriteDialog}
        openGetStartedDialog={openGetStartedDialog}
      />
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/posts/:id' element={<PostDetails />} />

          <Route
            path='/me/stories'
            element={
              <ProtectedRoutes roles={['admin', 'editor']}>
                <Stories />
              </ProtectedRoutes>
            }
          />

          <Route
            path='/new-post'
            element={
              <ProtectedRoutes roles={['admin', 'editor']}>
                <NewPost />
              </ProtectedRoutes>
            }
          />

          <Route
            path='/edit-post/:id'
            element={
              <ProtectedRoutes roles={['admin', 'editor']}>
                <EditPost />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </main>
      <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-center text-2xl'>
              {dialogTitle}
            </DialogTitle>
            <DialogDescription>
              Create your account to start exploring stories and sharing yours.
            </DialogDescription>
          </DialogHeader>
          <SignUpForm switchToSignIn={switchToSignIn} />
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
          {/* <p className='text-sm text-center mt-4 text-muted-foreground'>
                  Don’t have an account?{' '}
                  <span
                    className='text-primary underline cursor-pointer'
                    onClick={switchToSignUp}
                  >
                    Sign Up
                  </span>
                </p> */}
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
}

export default App;
