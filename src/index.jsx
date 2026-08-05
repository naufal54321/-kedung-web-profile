import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import KedungApp from './components/KedungApp';

const root = createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <BrowserRouter>
     <KedungApp />
     <Analytics />
   </BrowserRouter>
  </HelmetProvider>
);
