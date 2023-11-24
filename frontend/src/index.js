import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Favoritos from './components/Favoritos';
import { SemFilme } from './components/SemFilme';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "filmes",
    element: <Favoritos />,
  },
  {
    path: "erro",
    element: <SemFilme />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);