import './App.css';

import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import routes from './routes';

const Home = React.lazy(() => import('./pages/Home'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route) => (
            <Route
              path={route.path}
              element={
                <PrivateRoute>
                  <React.Suspense fallback={<>...</>}>
                    <route.component />
                  </React.Suspense>
                </PrivateRoute>
              }
              key={route.path}
            />
          ))}
          <Route element={<Home />} path={'/'} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
