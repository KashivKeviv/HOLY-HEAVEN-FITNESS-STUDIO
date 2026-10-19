/// <reference types="vite/client" />
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>,
);

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  const registerOfflineStudio = () => {
    void navigator.serviceWorker.register('/sw.js').catch(() => undefined);
  };
  if (document.readyState === 'complete') registerOfflineStudio();
  else window.addEventListener('load', registerOfflineStudio, { once: true });
}
