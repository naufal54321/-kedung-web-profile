import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { registerSW } from 'virtual:pwa-register';
import KedungApp from './components/KedungApp';

registerSW({ immediate: true });

const root = createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <BrowserRouter>
     <KedungApp />
   </BrowserRouter>
  </HelmetProvider>
);
