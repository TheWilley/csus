import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from 'react-router-dom';
import './index.css';
import Root from './routes/Root';
import Wrapper from './components/Wrapper';
import { urlIdLoader } from './utils/urlUtils';

// Create a browser router with the following routes
const router = createBrowserRouter([
  {
    path: '/:urlId',
    loader: urlIdLoader,
  },
  {
    path: '/',
    loader: () => redirect('/app'),
  },
  {
    path: 'app',
    element: <Root />,
  },
], {
  basename: '/csus/'
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>
  </React.StrictMode>
);
