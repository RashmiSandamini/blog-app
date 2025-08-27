import { Toaster } from 'sonner';
import './App.css';
import LandingPage from './pages/landing-page';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PostDetails from './pages/post-details';
import Stories from './pages/Stories';
import NewPost from './pages/new-post';
import EditPost from './pages/edit-post';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/posts/:id' element={<PostDetails />}></Route>
        <Route path='/me/stories' element={<Stories />}></Route>
        <Route path='/new-post' element={<NewPost />} />
        <Route path='/edit-post/:id' element={<EditPost />}></Route>
      </Routes>
    </>
  );
}

export default App;
