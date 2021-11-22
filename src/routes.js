import React from 'react';

const Map = React.lazy(() => import('./pages/Map'));
const PageNotFound = React.lazy(() => import('./pages/PageNotFound'));
const routes = [
  {
    enabled: true,
    path: '/map',
    component: Map,
    child: null
  },
  {
    enabled: true,
    path: '*',
    component: PageNotFound,
    child: null
  }
];

export default routes.filter((route) => route.enabled);
