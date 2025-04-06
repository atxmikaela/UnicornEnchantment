import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from '../src/store/session';
import Home from './components/Pages/Home';
import LoginFormModal from './components/Modals/LoginFormModal';
import SignupFormModal from './components/Modals/SignupFormModal';
import SingleSpot from './components/Pages/SingleSpot/SpotDetail';
import AddSpot from './components/Pages/AddSpot';
import UpdateSpot from './components/Pages/UpdateSpot';






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
        element: <Home />,
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
        element: <SingleSpot />
      },
      {
        path: "/spots/new",
        element: <AddSpot />
      },
      // {
      //   path: "spots/current",
      //   element: <ManageSpots />
      // },
      {
        path: "/spots/:id/edit",
        element: <UpdateSpot />
      },
      {


        path: "*",
        element: <h1>Where you going? You are going to get abducted!</h1>
      },

    ]
  }
]);



function App() {
  return <RouterProvider router={router} />;
}

export default App;
