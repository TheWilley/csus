import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Wrapper from './layout/Wrapper.tsx';
import { urlIdLoader } from './utils/urlUtils';
import Dashboard from './routes/Dashboard.tsx';
import Result from './routes/Result.tsx';
import Layout from './layout/Layout.tsx';
import Home from './routes/Home.tsx';

// Create a browser router with the following routes
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/result',
        element: <Result />,
      },
      {
        path: '/:urlId',
        loader: urlIdLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>
  </React.StrictMode>
);
