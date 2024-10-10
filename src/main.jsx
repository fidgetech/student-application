import React from 'react';
import ReactDOM from 'react-dom/client';
import Application from './Application.jsx';
import FourOhFour from './FourOhFour.jsx';
import { CssBaseline } from '@mui/material';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from './Header.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header heading='Redirecting...' subHeading=<meta http-equiv="refresh" content="0; url=https://www.fidgetech.org/studentapplication" /> />,
  },
  {
    path: '/application-part-1',
    element: <Application page='page1' />,
  },
  {
    path: '/application-part-2',
    element: <Application page='page2' />,
  },
  {
    path: '/application-combined',
    element: <Application page='combined' />,
  },
  {
    path: '/profile-edit',
    element: <Application page='profile' />,
  },
  {
    path: '*',
    element: <FourOhFour />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
