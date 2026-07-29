import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { store } from './app/store';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: '#1c1917',
              border: '1px solid #d97706',
              color: '#fafaf9',
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);