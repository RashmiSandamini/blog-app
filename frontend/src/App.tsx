import { Toaster } from 'sonner';
import './App.css';
import LandingPage from './pages/landing-page';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PostDetails from './pages/post-details';
import Stories from './pages/Stories';
import NewPost from './pages/new-post';
import EditPost from './pages/edit-post';
import Footer from './components/footer';

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Toaster />

      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/me/stories' element={<Stories />} />
          <Route path='/new-post' element={<NewPost />} />
          <Route path='/edit-post/:id' element={<EditPost />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
