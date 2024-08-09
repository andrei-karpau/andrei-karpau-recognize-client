import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const login = (email, password) => axios.post(`${API_URL}/user/login`, { email, password });

export const signup = (opts) => axios.post(`${API_URL}/user/signup`, opts);

