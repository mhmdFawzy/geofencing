import { Navigate } from 'react-router-dom';
import React from 'react';
import useLocalStorage from '../../hooks/useLocalstorage';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [token] = useLocalStorage('token');
  // return token ? location.pathname === "/" ? <Navigate to="/map" />:children : <Navigate to="/" />;
  return token ? (
    location.pathname === '/' ? (
      <Navigate to="/map" />
    ) : (
      children
    )
  ) : (
    <Navigate to="/" />
  );
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};
export default PrivateRoute;
