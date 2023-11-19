import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Favoritos from './components/Favoritos';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "filmes",
    element: <Favoritos />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);