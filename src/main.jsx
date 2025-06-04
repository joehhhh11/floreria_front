
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
const clerkPubKey = "pk_test_YXdha2UtdGVycmllci00LmNsZXJrLmFjY291bnRzLmRldiQ";
ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <React.StrictMode>
    <BrowserRouter>
      <App /> {/* ← Aquí dentro deben ir todas las rutas */}
    </BrowserRouter>
    </React.StrictMode>
  </ClerkProvider>
);
