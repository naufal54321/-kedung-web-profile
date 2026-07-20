import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import KedungApp from './components/KedungApp';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <KedungApp />
 </BrowserRouter>
);
