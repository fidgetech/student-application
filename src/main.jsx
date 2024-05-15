import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Success from './Success.jsx';
import FourOhFour from './FourOhFour.jsx';
import { CssBaseline } from '@mui/material';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/application-part-2',
    element: <App />,
  },
  {
    path: '/success',
    element: <Success />,
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
