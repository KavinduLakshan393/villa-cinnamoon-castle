import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
// Fonts are self-hosted so no visitor request reaches a third-party font service.
import '@fontsource/plus-jakarta-sans/latin-400.css';
import '@fontsource/plus-jakarta-sans/latin-500.css';
import '@fontsource/plus-jakarta-sans/latin-600.css';
import '@fontsource/bodoni-moda/latin-400-italic.css';
import '@fontsource/bodoni-moda/latin-500-italic.css';
import './styles/tokens.css';
import './styles/base.css';
import { PackagesProvider } from './data/PackagesContext.jsx';

// Set this before React mounts. On hosted builds, the browser can otherwise
// restore the previous document position after our route has already rendered.
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PackagesProvider>
        <App />
      </PackagesProvider>
    </BrowserRouter>
  </StrictMode>,
);
