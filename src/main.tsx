import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './routes/Root';
import Wrapper from './components/Wrapper';
import { urlIdLoader } from './utils/urlUtils';

// Create a browser router with the following routes
const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/:urlId',
    loader: urlIdLoader,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>
  </React.StrictMode>
);
