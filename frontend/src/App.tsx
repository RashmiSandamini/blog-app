import { Toaster } from 'sonner';
import './App.css';
import LandingPage from './pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/posts/:id' element={<PostDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
