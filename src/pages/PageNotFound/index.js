import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const PageNotFound = () => {
  const navigate = useNavigate();
  const goTohome = () => {
    navigate('/');
  };
  return (
    <div>
      <h3>Page you&apos;re trying to access is not available</h3>
      <Button handleClick={goTohome}>Go to Home Page</Button>
    </div>
  );
};

export default PageNotFound;
