import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginFormModal from './components/LoginFormModal';
import SignupFormModal from './components/SignupFormModal';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import Crash from './components/Crash/index.js';
import CornholeDetail from './components/CornholeDetail/CornholeDetail.jsx';
import CreateACornhole from './components/Cornholes/CreateACornhole/CreateACornhole.jsx';
import ManageCornholes from './components/Cornholes/ManageCornholes';
import UpdateCornhole from './components/UpdateCornhole.jsx';


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
        element: <Crash />,
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
        element: <CornholeDetail />
      },
      {
        path: "/cornholes/new",
        element: <CreateACornhole />
      },
      {
        path: "cornholes/current",
        element: <ManageCornholes />
      },
      {
        path: "/cornholes/:id/edit",
        element: <UpdateCornhole />
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
