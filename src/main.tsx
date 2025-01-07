import './index.css';
import App from './components/App.tsx';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
