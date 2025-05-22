// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ShoppingListProvider } from "./contexts/ShoppingListContext";
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ShoppingListProvider>
          <App />
        </ShoppingListProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
