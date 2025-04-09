import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/index.css';
import { App } from './components/App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find the root element.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
