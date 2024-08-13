import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export default axios.create({
  baseURL: BASE_URL, //'http://localhost:3005/api/', //`http://g-axon.work/jwtauth/api/`, //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});
