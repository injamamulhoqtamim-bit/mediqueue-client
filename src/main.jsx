import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Tutors from './pages/Tutors';
import TutorDetails from './pages/TutorDetails';
import AddTutor from './pages/AddTutor';
import MyTutors from './pages/MyTutors';
import BookedSessions from './pages/BookedSessions';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './providers/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/tutors", element: <Tutors /> },
      { path: "/tutors/:id", element: <PrivateRoute><TutorDetails /></PrivateRoute> },
      { path: "/add-tutor", element: <PrivateRoute><AddTutor /></PrivateRoute> },
      { path: "/my-tutors", element: <PrivateRoute><MyTutors /></PrivateRoute> },
      { path: "/my-bookings", element: <PrivateRoute><BookedSessions /></PrivateRoute> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  </React.StrictMode>,
)