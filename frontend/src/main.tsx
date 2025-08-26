import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <div className='px-6 lg:px-32 bg-yellow-50 min-h-screen pt-3'>
          <App />
        </div>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
