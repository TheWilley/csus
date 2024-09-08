import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import Root from './routes/Root';
import Wrapper from './components/Wrapper';
import Dashboard from './routes/Dashboard';
import { urlIdLoader } from './utils/urlUtils';

// A function that fetches the data and returns a redirect

const router = createBrowserRouter([
  {
    path: 'app',
    element: <Root />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />
  },
  {
    path: ':urlId',
    loader: urlIdLoader
  }
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
