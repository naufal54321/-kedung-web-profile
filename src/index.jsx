import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import KedungApp from './components/KedungApp';

const root = createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <BrowserRouter>
     <KedungApp />
   </BrowserRouter>
  </HelmetProvider>
);
