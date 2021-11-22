import React, { useRef, useState } from 'react';

import Field from '../../components/Field';
import Form from './../../components/Form';
import { Navigate } from 'react-router';
import client from '../../utils/axios';
import useLocalStorage from '../../hooks/useLocalstorage';

const Home = () => {
  const [token, setToken] = useLocalStorage('token');
  const [renderMap, setRenderMap] = useState();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = (data) => {
    const credintials = JSON.stringify(data);
    client
      .post('login', credintials, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }
      })
      .then((res) => setToken(res.data.token))
      .then(() => {
        setRenderMap(true);
      });
  };

  return renderMap ? (
    <Navigate to="/map" />
  ) : token ? (
    <Navigate to="/map" />
  ) : (
    <Form onSubmitFunc={handleSubmit} values={{ username: usernameRef, password: passwordRef }}>
      <Field ref={usernameRef} label="Username:" type="text" />
      <Field ref={passwordRef} label="Password:" type="password" />
    </Form>
  );
};

export default Home;
