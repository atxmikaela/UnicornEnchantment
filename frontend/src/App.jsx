import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginFormModal from './components/LoginFormModal';
import SignupFormModal from './components/SignupFormModal';
import Home from './components/Home';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import NameOfSpot from './components/Spots/NameOfSpot';
import CreateASpot from './components/Spots/CreateASpot';
import ManageSpot from './components/Spots/ManageSpot';
import UpdateSpot from './components/Spots/UpdateSpot';
import ManageReviews from './components/Reviews/ManageReviews';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "login",
        element: <LoginFormModal />
      },
      {
        path: "signup",
        element: <SignupFormModal />
      },
      {
        path: "spots/:id",
        element: <NameOfSpot />
      },
      {
        path: "spots/new",
        element: <CreateASpot />
      },
      {
        path: "spots/current",
        element: <ManageSpot />
      },
      {
        path: "spots/:id/edit",
        element: <UpdateSpot />
      },
      {
        path: "reviews/current",
        element: <ManageReviews />
      },
      {
        path: "*",
        element: <h2>Where you going?</h2>
      },

    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
