import React, { PropsWithChildren } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import authenticationSession from '@utils/authenticationSession';
import Page404 from '@components/pages/Page404';
import Page500 from '@components/pages/Page500';
import Home from '@components/pages/Home';

type ProtectedRouteProps = {
  redirect?: string;
};
const ProtectedRoute: React.FunctionComponent<PropsWithChildren<ProtectedRouteProps>> = ({
  children,
  redirect = '/',
}) => {
  const authenticated = authenticationSession.getAuthenticatedStatus();

  if (!authenticated) {
    return <Navigate to={redirect} replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: '/404',
    element: <Page404 />,
  },

  {
    path: '/500',
    element: <Page500 />,
  },

  {
    path: '/',
    element: <Home />,
  },
]);

export default router;
