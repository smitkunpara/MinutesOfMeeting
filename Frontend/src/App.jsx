import React, { useState } from 'react';
import Home from './components/home.jsx';
import Transcript from './components/transcript.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


const App = () => {
  const router = createBrowserRouter([
    {path: '/', element: <Home />},
    {path: "/transcript", element: <Transcript />},
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;