import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Favoritos from './components/Favoritos';
import Cadastro from './components/Cadastro';
import Login from './components/Login';

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
    path: "Cadastro",
    element: <Cadastro />,
  },
  {
    path: "Login",
    element: <Login />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);