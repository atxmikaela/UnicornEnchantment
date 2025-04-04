import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from '../src/store/session';
import Home from './components/Pages/Home';
import AddCornhole from './components/Pages/AddCornhole/AddCornhole';
import SingleCornhole from './components/Pages/SingleCornhole';
import LoginFormModal from './components/Modals/LoginFormModal';
import SignupFormModal from './components/Modals/SignupFormModal';






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
        path: "cornholes/:id",
        element: <SingleCornhole />
      },
      {
        path: "/cornholes/new",
        element: <AddCornhole />
      },
      // {
      //   path: "cornholes/current",
      //   element: <ManageCornholes />
      // },
      // {
      //   path: "/cornholes/:id/edit",
      //   element: <UpdateCornhole />
      // },
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
