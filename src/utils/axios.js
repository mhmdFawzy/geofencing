import axios from 'axios';

const client = axios.create({
  baseURL: 'https://zones-backend-halan.herokuapp.com/'
});

export default client;
